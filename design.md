# Design — gioxx/YOURLS

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## History

- v1: catalog Cobalt (cool blue, technical) — rejected as too austere/bare.
- v2: custom "Ember" (warm terracotta, serif, pill CTAs, playful icon flourish) — rejected outright.
- v3: dark-mode-primary, aubergine/violet, Linear-clean structure × Runway/Suno
  dark glow (token layer only). Rejected: "non c'è nulla di rivoluzionario,
  è ancora come prima" — the structure never changed across v1–v3, only the skin.
- v4 (current): **studied-DNA** from https://www.awesomeintune.com/ (user-supplied
  reference, public site). Structural DNA only — palette/copy/imagery not copied.
  Adds: search-first hero, category-pill filter, honest 3-stat strip, "newest"
  rail (sorted by real `publishedAt`), Ft3 footer (was Ft1). Aubergine palette
  from v3 kept (user confirmed that axis separately from the "still looks the
  same" complaint, which was about structure).

Diversification is suspended for the studied-DNA axis per SKILL.md — the
structure came from the reference, not the catalog rotation.

## Genre

atmospheric, restrained toward modern-minimal — dark canvas as the primary
mode (user runs dark by default), radial glow blooms behind the hero and on
card hover, but Linear-level structural calm: no bounce, no rotation
flourish, no serif, no pill CTAs. Light mode stays supported (existing
theme toggle) but sober — no blooms in light mode.

## Macrostructure family

Unchanged — the redesign has always been about the visual layer, not the
information architecture:

- Marketing (home `/`): **Ecosystem Index** — search-first hero + category pills + stat strip + newest rail + featured + full browse grid (per studied DNA).
- Content (`/about`, `/donate`): **Index-First** — intro + link list.
- App (`/plugins/$slug`): **Workbench** — guided install tour.

## Theme — custom "Aubergine"

Dark (default expression):

- `--color-paper` oklch(14% 0.03 300)
- `--color-paper-2` oklch(18% 0.032 300)
- `--color-ink` oklch(95% 0.01 300)
- `--color-ink-2` oklch(72% 0.014 300)
- `--color-rule` oklch(100% 0 0 / 0.09)
- `--color-accent` oklch(70% 0.2 305) — violet-magenta glow
- `--color-accent-foreground` oklch(98% 0.01 300)
- `--color-focus` oklch(72% 0.22 305)
- `--color-graphite` oklch(16% 0.028 300) — code/terminal panels

Light (toggle-only, no blooms):

- `--color-paper` oklch(97% 0.01 300)
- `--color-paper-2` oklch(94% 0.012 300)
- `--color-ink` oklch(20% 0.014 300)
- `--color-ink-2` oklch(48% 0.012 300)
- `--color-rule` oklch(20% 0.014 300 / 0.1)
- `--color-accent` oklch(52% 0.19 300)
- `--color-focus` oklch(54% 0.2 300)

### Diversification axes

- Paper band: **dark** (primary expression, L14%)
- Display style: **geometric-sans** (Geist — Linear's own face)
- Accent hue: **chromatic-other** — violet/aubergine ~300–305°

Differs from both v1 (Cobalt: light/grotesk-sans/cool-blue) and v2 (Ember:
light/roman-serif/warm) on every axis.

## Typography

- Display + body: **Geist**, single-family discipline (Linear's own choice — genre voice rule: "same family as display")
- Mono: **JetBrains Mono / Geist Mono** — labels, eyebrows, code/install blocks
- No serif, no pill-flourish type moments — restraint over the previous pass

## Spacing / radius

`--radius: 0.625rem` (10px) — Linear's own radius band. No pill CTAs this
time; moderate rounding on cards/buttons/inputs. Icon badges are circular
(they're small, a circle is not "the pill CTA tell").

## Motion — calm, not playful

- Hero + one other section: **static radial glow blooms** (two, ~20–25%
  footprint each, fixed-attached, no animation — per atmospheric genre
  allowance). This carries the "rich/elegant" ask without a drawn mascot or
  illustration — v2's mistake was over-illustrating; this pass leans on
  atmosphere and light instead.
- Cards: lift `translateY(-4px)` + soft violet glow shadow on hover, 220ms
  `--ease-out`. No rotation, no scale-bounce (v2's icon-badge rotate is cut).
- Buttons: lift on hover only — no press-down flourish, no pill shape.
- Section reveal: existing IntersectionObserver stagger kept (fade + rise) — unchanged.

## Microinteractions stance

- Silent success (copy button) — unchanged.
- One continuous motion only: nothing loops except the (static, non-animated) blooms — even those don't move, they're a fixed atmosphere, not a live effect.
- No autoplay, no bounce, no rotation. Calmer than v2 across the board.

## CTA voice

- Primary CTA: solid `--color-accent` fill, `--color-accent-foreground` text, `--radius` (10px, not pill)
- Secondary CTA: 1px `--color-rule` border, transparent fill, same radius
- Copy pattern unchanged (name the destination)

## Chrome discipline

Unchanged from v1/v2 — no re-drawn browser/IDE chrome. Code/terminal blocks
use the typographic frame (mono label + hairline), now on the graphite-violet panel colour.

## What pages MUST share

- Wordmark: `gioxx/YOURLS`, Geist 600.
- Accent placement: icon badges, links, active nav, primary buttons, focus rings, hero blooms. Single accent only this pass — no secondary hue (v2's teal is cut for restraint).
- Display/body/mono fonts, mono label voice (UPPERCASE, 0.06em tracking).
- CTA voice (radius, copy pattern).
- Nav (N1b shell) and footer (Ft3 index columns, per studied DNA), both in the dark-glow register.

## Nav / footer

- Nav: **N1b** — bordered/soft-shadow bar, violet-tinted ambient shadow on scroll.
- Footer: **Ft3 Index columns** — Plugins / Project / Resources columns + wordmark/tagline row + copyright/disclaimer (matches the studied reference's footer shape).

## Exports

Tokens declared inline in `src/styles.css` `@theme`/`:root` (project convention, append-only).
