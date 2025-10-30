# Copilot / Contributor guidelines — Equipe Limone

Short, practical rules to generate UI, components and copy that match the brand.

Core contract
- Input: UI requests, page designs, copy tasks.
- Output: Next.js/React (TSX) components, CSS/Tailwind snippets, small copy pieces in English or Italian.
- Keep changes small, accessible, and dependency-light.

Colors & tokens
- Primary: Equipe Red — &#35;ee2825 (use for primary CTAs and accents)
- Background: &#35;ffffff; Text: &#35;111111
- Accents: &#35;f3f4f6 (muted), &#35;e8f4fb (snow blue)
- Alt background: &#35;fbfafa

CSS variables (example)
```css
:root {
  --color-primary: &#35;ee2825;
  --color-bg: &#35;ffffff;
  --color-text: &#35;111111;
  --radius-sm: 4px; /* target 2–4px */
}
```

Typography
- Preferred: Lexend for headings and main text. Fallback to a modern system sans.
- Base: 16px, line-height 1.4–1.6.

Visual style
- Tone: premium, family-friendly, clear and approachable.
- Corners: 2–4px. Spacious layouts and generous padding around photos and CTAs.
- Photos: authentic, dynamic (kids/families). Prefer full-bleed hero images.
- Motion: small transitions (0.18–0.25s). Respect `prefers-reduced-motion`.

Buttons
- Variants: primary (solid), secondary (outline), ghost (text).
- Primary example: bg `--color-primary`, text white, border-radius `--radius-sm`, subtle hover/focus.

Accessibility
- Maintain at least 4.5:1 contrast for body text.
- Visible focus states for interactive elements.
- Always include meaningful `alt` text; use `alt=""` for decorative images.

Copy tone
- Audience: children, families, small groups, pre-competitive programs.
- Voice: simple, encouraging, trustworthy. Use Italian where content targets local users.

Technical guidance
- Use modular, typed (TS) components: e.g. `Button`, `Hero`, `Card`.
- Prefer CSS Modules or Tailwind; keep runtime dependencies minimal.
- Use `next/image` for images when possible.
 - Per primitive UI comuni (button, select, input, ecc.) valutare l'uso di `shadcn/ui` per componenti accessibili e riutilizzabili; per elementi semplici o molto custom, il CSS di base è sufficiente.

Helpful prompts
- "Create a `Hero` TSX component using Lexend, full-width image, title, subtitle and a primary red CTA. Props: imageSrc, title, subtitle, ctaLabel, onCtaClick. Include accessible markup and reduced-motion support."
- "Create a `CourseCard` component: image, title, recommended age, optional 'Pre-competitive' badge. 4px radius, light shadow."

Do not
- Use primary red for long body text.
- Sacrifice contrast for aesthetics.
- Add heavy UI libraries without approval.

Keep this file short and update when branding or tokens change.