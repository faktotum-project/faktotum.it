// FAKTOTUM Web UI Kit — Shared Components (Light Theme)
// Load via <script type="text/babel" src="components.jsx">

const FKT = {
  colors: {
    bg:          '#FFFFFF',
    bgSoft:      '#F8F9FA',
    bgPurple:    '#F5F0FB',
    text:        '#1A0B2E',
    textSec:     '#4A3A5C',
    textLight:   '#6B5A7D',
    border:      '#E5E1EB',
    borderLight: '#F0EBF5',
    lime:        '#ABFA0F',
    limeSoft:    '#F5FFE0',
    limeDark:    '#8CC408',
    limeText:    '#4D7600',
    blue:        '#667EEA',
    blueText:    '#4A5FBF',
    purple:      '#764BA2',
    error:       '#E53E3E',
  }
};

// ── Badge ─────────────────────────────────────────────────────
function Badge({ children, variant = 'neutral' }) {
  const v = {
    active:  { bg:'#F5FFE0',  color:'#4D7600', border:'rgba(140,196,8,0.3)' },
    running: { bg:'rgba(102,126,234,0.1)', color:'#4A5FBF', border:'rgba(102,126,234,0.25)' },
    idle:    { bg:'#F8F9FA',  color:'#6B5A7D', border:'#E5E1EB' },
    error:   { bg:'rgba(229,62,62,0.08)', color:'#C53030', border:'rgba(229,62,62,0.2)' },
    neutral: { bg:'#F8F9FA',  color:'#6B5A7D', border:'#E5E1EB' },
    beta:    { bg:'rgba(118,75,162,0.1)', color:'#764BA2', border:'rgba(118,75,162,0.25)' },
  }[variant] || { bg:'#F8F9FA', color:'#6B5A7D', border:'#E5E1EB' };
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:5,padding:'3px 10px',borderRadius:9999,fontSize:12,fontWeight:600,fontFamily:'Inter',background:v.bg,color:v.color,border:`1px solid ${v.border}`}}>
      {variant==='active'&&<span style={{width:6,height:6,borderRadius:'50%',background:'currentColor'}}/>}
      {children}
    </span>
  );
}

// ── Button ────────────────────────────────────────────────────
function Button({ children, variant='primary', size='md', onClick, style: ext }) {
  const [hov, setHov] = React.useState(false);
  const base = {display:'inline-flex',alignItems:'center',gap:8,borderRadius:9999,fontFamily:'Space Grotesk',fontWeight:700,cursor:'pointer',border:'none',outline:'none',transition:'all 150ms'};
  const sz = {sm:{padding:'6px 16px',fontSize:13},md:{padding:'10px 22px',fontSize:14},lg:{padding:'13px 28px',fontSize:16}};
  const vs = {
    primary: {background:hov?'#8CC408':'#ABFA0F',color:'#1A0B2E',boxShadow:'0 4px 14px rgba(140,196,8,0.28)'},
    brand:   {background:'linear-gradient(135deg,#667EEA,#764BA2)',color:'#fff'},
    ghost:   {background:'transparent',border:`1.5px solid ${hov?'#764BA2':'#E5E1EB'}`,color:hov?'#764BA2':'#1A0B2E'},
    subtle:  {background:hov?'#F0EBF5':'#F8F9FA',color:'#4A3A5C',border:'1px solid #E5E1EB',borderRadius:10},
    danger:  {background:'transparent',color:'#E53E3E',border:'1.5px solid rgba(229,62,62,0.3)'},
  };
  return (
    <button style={{...base,...sz[size],...vs[variant],...ext}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}>
      {children}
    </button>
  );
}

// ── Card ──────────────────────────────────────────────────────
function Card({ children, style: ext, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={()=>onClick&&setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:'#fff',borderRadius:14,border:`1px solid ${hov?'#764BA2':'#E5E1EB'}`,boxShadow:'0 4px 16px rgba(26,11,46,0.07)',padding:24,transition:'border-color 150ms',...ext}}>
      {children}
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────
function StatCard({ label, value, trend, gradient }) {
  return (
    <Card style={{flex:1,background:gradient?'linear-gradient(135deg,rgba(102,126,234,0.05),rgba(118,75,162,0.05))':undefined,borderColor:gradient?'rgba(118,75,162,0.15)':undefined}}>
      <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#6B5A7D',marginBottom:8,fontFamily:'Inter'}}>{label}</div>
      <div style={{fontFamily:'Space Grotesk',fontWeight:700,fontSize:30,letterSpacing:0,color:gradient?'transparent':'#1A0B2E',background:gradient||'none',WebkitBackgroundClip:gradient?'text':'initial',WebkitTextFillColor:gradient?'transparent':'initial',backgroundClip:gradient?'text':'initial'}}>{value}</div>
      {trend&&<div style={{fontSize:12,color:'#4D7600',marginTop:4,fontFamily:'Inter'}}>{trend}</div>}
    </Card>
  );
}

// ── AgentRow ──────────────────────────────────────────────────
function AgentRow({ name, description, status, runs, lastRun, onRun }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:16,padding:'13px 20px',borderBottom:'1px solid #F0EBF5',transition:'background 150ms'}}
      onMouseEnter={e=>e.currentTarget.style.background='#FAFAFA'}
      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
      <div style={{width:36,height:36,borderRadius:10,background:'rgba(171,250,15,0.12)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <LogoMark size={18}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontFamily:'Space Grotesk',fontWeight:600,fontSize:14,color:'#1A0B2E'}}>{name}</div>
        <div style={{fontSize:12,color:'#6B5A7D',marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{description}</div>
      </div>
      <Badge variant={status}>{status.charAt(0).toUpperCase()+status.slice(1)}</Badge>
      <div style={{fontSize:12,color:'#6B5A7D',fontFamily:'Inter',minWidth:60,textAlign:'right'}}>{runs} runs</div>
      <div style={{fontSize:12,color:'#6B5A7D',minWidth:90,textAlign:'right',fontFamily:'Inter'}}>{lastRun}</div>
      <Button variant="subtle" size="sm" onClick={onRun}>Run</Button>
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────
function Input({ label, placeholder, value, onChange, error, type='text' }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:6}}>
      {label&&<label style={{fontSize:12,fontWeight:600,color:'#6B5A7D',letterSpacing:'0.06em',textTransform:'uppercase',fontFamily:'Inter'}}>{label}</label>}
      <input type={type} value={value||''} onChange={onChange} placeholder={placeholder||''}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{background:'#fff',border:`1.5px solid ${error?'rgba(229,62,62,0.6)':focus?'#ABFA0F':'#E5E1EB'}`,borderRadius:10,padding:'10px 14px',fontFamily:'Inter',fontSize:14,color:'#1A0B2E',outline:'none',boxShadow:focus&&!error?'0 0 0 3px rgba(171,250,15,0.2)':error?'0 0 0 3px rgba(229,62,62,0.1)':'none',transition:'all 150ms'}}/>
      {error&&<div style={{fontSize:12,color:'#E53E3E',fontFamily:'Inter'}}>{error}</div>}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────
function Modal({ title, children, onClose }) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(26,11,46,0.4)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200}} onClick={onClose}>
      <div style={{background:'#fff',border:'1px solid #E5E1EB',borderRadius:20,padding:32,width:480,maxWidth:'90vw',boxShadow:'0 24px 64px rgba(26,11,46,0.18)'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <h3 style={{fontFamily:'Space Grotesk',fontWeight:700,fontSize:20,color:'#1A0B2E',letterSpacing:0}}>{title}</h3>
          <button onClick={onClose} style={{background:'#F8F9FA',border:'1px solid #E5E1EB',borderRadius:8,width:32,height:32,cursor:'pointer',color:'#6B5A7D',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Logo Mark (real SVG path) ─────────────────────────────────
const MARK_PATH = "M 2.9872 38.4685 C 3.5717 38.4685 4.1778 38.3170 4.8056 37.9706 L 17.5339 30.6107 L 36.1717 40.5899 C 37.0159 41.0228 37.7736 41.2826 38.4663 41.2826 C 39.4836 41.2826 40.3497 40.8064 41.2585 39.7240 L 55.2641 22.0170 C 55.7619 21.3676 56 20.6965 56 20.0688 C 56 18.5751 54.7662 17.2980 53.0993 17.2980 C 52.5150 17.2980 51.8655 17.4495 51.2161 17.8392 L 38.4663 25.1990 L 19.8284 15.2199 C 18.9842 14.7437 18.2049 14.5272 17.5122 14.5272 C 16.5165 14.5272 15.6289 14.9818 14.7631 16.0858 L .7576 33.7928 C .2165 34.4422 0 35.1133 0 35.7410 C 0 37.2563 1.3421 38.4685 2.9872 38.4685 Z M 4.3077 34.9184 C 4.0479 35.0699 3.8531 34.8318 4.0263 34.6370 L 17.2741 18.4452 C 17.5772 18.0556 17.8802 18.0123 18.2699 18.2288 L 37.6870 28.5976 C 38.5962 29.0738 38.8775 28.9656 39.5919 28.4894 L 51.7574 20.8913 C 51.9520 20.7614 52.1688 20.9779 51.9954 21.1728 L 38.7477 37.3645 C 38.4446 37.7325 38.1416 37.7975 37.7519 37.5810 L 18.3131 27.2122 C 17.4256 26.7360 17.1442 26.8442 16.4083 27.2988 Z";

function LogoMark({ size=24, color="#abfa0f" }) {
  return (
    <svg width={size} height={size} viewBox="-2 13 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d={MARK_PATH}/>
    </svg>
  );
}

// ── Sidebar ────────────────────────────────────────────────────
function Sidebar({ active, onNav }) {
  const items = [
    {id:'Dashboard',path:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>},
    {id:'Agents',path:<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>},
    {id:'Workflows',path:<><rect x="2" y="3" width="6" height="6" rx="1.5"/><rect x="16" y="3" width="6" height="6" rx="1.5"/><rect x="9" y="15" width="6" height="6" rx="1.5"/><line x1="5" y1="9" x2="5" y2="12"/><line x1="19" y1="9" x2="19" y2="12"/><path d="M5 12h14"/><line x1="12" y1="12" x2="12" y2="15"/></>},
    {id:'Analytics',path:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>},
    {id:'Settings',path:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>},
  ];
  return (
    <div style={{width:220,flexShrink:0,background:'#fff',borderRight:'1px solid #E5E1EB',display:'flex',flexDirection:'column',padding:'16px 12px',gap:2}}>
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',marginBottom:16}}>
        <LogoMark size={22}/>
        <span style={{fontFamily:'Space Grotesk',fontWeight:700,fontSize:16,color:'#1A0B2E',letterSpacing:0}}>faktotum</span>
      </div>
      {items.map(item=>(
        <button key={item.id} onClick={()=>onNav&&onNav(item.id)} style={{
          display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:9,border:'none',cursor:'pointer',transition:'all 150ms',textAlign:'left',
          background:active===item.id?'#F5F0FB':'transparent',
          color:active===item.id?'#764BA2':'#6B5A7D',
          fontFamily:'Inter',fontWeight:500,fontSize:14
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{item.path}</svg>
          {item.id}
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { FKT, Badge, Button, Card, StatCard, AgentRow, Input, Modal, Sidebar, LogoMark, MARK_PATH });
