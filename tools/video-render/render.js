/**
 * HyperFrames-style renderer for FAKTOTUM
 * - Opens each composition (HTML) in a headless Edge via Puppeteer
 * - Captures N frames by advancing time deterministically (GSAP timeline seek + raf tick)
 * - Pipes PNGs → FFmpeg → MP4 (H.264 yuv420p)
 *
 * Usage:
 *   node render.js                        # renders everything
 *   node render.js agent openclaw         # render single agent
 *   node render.js hero                   # render hero only
 */
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const ffmpegPath = require('ffmpeg-static');

// ---- Config ----
const OUT_DIR = path.resolve(__dirname, '..', '..', 'assets', 'videos');
const COMP_DIR = path.resolve(__dirname, 'compositions');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// Agent render: 1280x720, 10s @ 30fps = 300 frames
const AGENT_SPEC = {
  width: 1280,
  height: 720,
  fps: 30,
  duration: 10, // seconds
};

// Hero render: 1920x1080, 15s @ 30fps = 450 frames
const HERO_SPEC = {
  width: 1920,
  height: 1080,
  fps: 30,
  duration: 15,
};

const AGENTS = ['openclaw', 'hermes', 'kilo', 'nanoclaw', 'nemoclaw'];
const AGENT_LABELS = {
  openclaw: '01-openclaw',
  hermes: '02-hermes',
  kilo: '03-kilo',
  nanoclaw: '04-nanoclaw',
  nemoclaw: '05-nemoclaw',
};

async function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function renderComposition({ url, spec, outFile, label }) {
  console.log(`\n[render] ${label}`);
  console.log(`  url:  ${url}`);
  console.log(`  size: ${spec.width}x${spec.height}  fps:${spec.fps}  dur:${spec.duration}s`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: EDGE_PATH,
    defaultViewport: {
      width: spec.width,
      height: spec.height,
      deviceScaleFactor: 1,
    },
    args: [
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${spec.width},${spec.height}`,
      '--hide-scrollbars',
      '--disable-web-security',
      '--font-render-hinting=none',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: spec.width, height: spec.height, deviceScaleFactor: 1 });

    // Inject deterministic time BEFORE any script runs
    await page.evaluateOnNewDocument(() => {
      window.__frameNow = 0;
      const origNow = performance.now.bind(performance);
      performance.now = () => window.__frameNow;
      const origDateNow = Date.now.bind(Date);
      Date.now = () => window.__frameNow;
      // Override rAF to be instantly callable (GSAP ticker uses it)
      window.requestAnimationFrame = (cb) => setTimeout(() => cb(window.__frameNow), 0);
      window.cancelAnimationFrame = (id) => clearTimeout(id);
    });

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for composition to be ready (gsap loaded, __ready flag set)
    await page.waitForFunction(() => window.__ready === true && window.gsap, { timeout: 15000 });

    // Stop GSAP's auto ticker so we can drive it manually
    await page.evaluate(() => {
      window.gsap.ticker.fps(-1); // lazy ticker
      // Pause all active tweens, we'll drive via time
      window.gsap.globalTimeline.pause();
    });

    const totalFrames = spec.fps * spec.duration;
    const tmpDir = path.join(__dirname, `.tmp-${label}`);
    await ensureDir(tmpDir);

    console.log(`  capturing ${totalFrames} frames…`);
    const t0 = Date.now();

    for (let i = 0; i < totalFrames; i++) {
      const tMs = (i / spec.fps) * 1000;
      await page.evaluate((ms) => {
        window.__frameNow = ms;
        // Seek GSAP global timeline
        if (window.gsap && window.gsap.globalTimeline) {
          window.gsap.globalTimeline.totalTime(ms / 1000);
        }
      }, tMs);

      // Small wait to let DOM/style settle
      // page.screenshot itself awaits rendering, but give a tick
      const framePath = path.join(tmpDir, `f-${String(i).padStart(5, '0')}.png`);
      await page.screenshot({ path: framePath, type: 'png', omitBackground: false });

      if (i % 30 === 0) {
        process.stdout.write(`    frame ${i}/${totalFrames}\r`);
      }
    }
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`  captured ${totalFrames} frames in ${elapsed}s`);

    await browser.close();

    // Encode with FFmpeg
    console.log(`  encoding → ${outFile}`);
    await encodeFrames(tmpDir, spec.fps, outFile);

    // Cleanup temp frames
    fs.rmSync(tmpDir, { recursive: true, force: true });
    console.log(`  [ok] ${outFile}`);
  } catch (err) {
    await browser.close();
    throw err;
  }
}

function encodeFrames(framesDir, fps, outFile) {
  return new Promise((resolve, reject) => {
    const args = [
      '-y',
      '-framerate', String(fps),
      '-i', path.join(framesDir, 'f-%05d.png'),
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '20',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      outFile,
    ];
    const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    ff.stderr.on('data', (d) => { stderr += d.toString(); });
    ff.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}\n${stderr.slice(-2000)}`));
    });
  });
}

async function main() {
  await ensureDir(OUT_DIR);

  const args = process.argv.slice(2);
  const mode = args[0] || 'all';

  // Use file:// URLs (Puppeteer can load local files)
  const compFile = (name) => 'file://' + path.join(COMP_DIR, name).replace(/\\/g, '/');

  const agentTasks = AGENTS.map((a) => ({
    label: AGENT_LABELS[a],
    url: compFile('agent.html') + `?a=${a}`,
    spec: AGENT_SPEC,
    outFile: path.join(OUT_DIR, `momentum-${AGENT_LABELS[a]}.mp4`),
  }));
  const heroTask = {
    label: 'hero',
    url: compFile('hero.html'),
    spec: HERO_SPEC,
    outFile: path.join(OUT_DIR, 'hero.mp4'),
  };

  let tasks = [];
  if (mode === 'all') tasks = [...agentTasks, heroTask];
  else if (mode === 'agents') tasks = agentTasks;
  else if (mode === 'hero') tasks = [heroTask];
  else if (mode === 'agent' && args[1]) {
    const a = args[1];
    if (!AGENTS.includes(a)) throw new Error(`unknown agent: ${a}`);
    tasks = [agentTasks.find((t) => t.label === AGENT_LABELS[a])];
  } else {
    throw new Error(`unknown mode: ${mode}`);
  }

  console.log(`[faktotum] Rendering ${tasks.length} composition(s) → ${OUT_DIR}`);
  console.log(`[faktotum] ffmpeg:  ${ffmpegPath}`);
  console.log(`[faktotum] browser: ${EDGE_PATH}`);

  const tStart = Date.now();
  for (const t of tasks) {
    await renderComposition(t);
  }
  const totalElapsed = ((Date.now() - tStart) / 1000).toFixed(1);
  console.log(`\n[faktotum] ✅ Done in ${totalElapsed}s`);
}

main().catch((err) => {
  console.error('\n[render] ERROR:', err.message);
  console.error(err.stack);
  process.exit(1);
});
