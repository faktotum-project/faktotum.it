---
name: faktotum-design
description: Use this skill to generate well-branded interfaces and assets for FAKTOTUM, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read `README.md` first, then use `colors_and_type.css`, `assets/`, `preview/`, and `ui_kits/web/` as the source of truth.

Default to the product light theme documented in the README. Use the optional dark tokens only for dark marketing surfaces or explicit dark-mode work.

When creating visual artifacts, reuse the provided logo assets and token values. For HTML prototypes, copy or import `colors_and_type.css` and keep the interface product-first: dense, clean, accessible, and not overly decorative.

When writing production code, map the same tokens into the target framework instead of inventing new colors, radii, or typography rules. Use `--accent-blue-text` for readable links on light backgrounds and keep focus states visible.

If the user invokes this skill without other guidance, ask what surface they want to build or refine, then act as an expert FAKTOTUM designer who can output HTML artifacts, production code, or implementation guidance depending on the need.
