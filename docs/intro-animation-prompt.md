# Prompt — Immersive CLI Intro v2 + Niko the brand pet

Copy everything below the line into Claude Code / Cursor while it's open on `my-app`.

---

## Context

This repo is my portfolio: React 19 + Vite + Tailwind v4 (tokens live in `@theme` inside `src/index.css`), react-router, JetBrains Mono for UI, Inter for prose. The whole site is styled as a calm, flat "portfolio OS": a macOS-style window (`src/components/WindowChrome.tsx`) on a paper-warm canvas in light mode and charcoal in dark mode, a command bar (`src/components/CommandBar.tsx`), a pixel-tile curtain used for view transitions (`src/components/PixelOverlay.tsx` + `TransitionTickProvider`), and an ASCII pet named Niko (`--niko` orange, flat colors, no glow — that rule is documented in `index.css` and must hold everywhere).

There is already a working CLI intro in `src/components/Intro/` (`CLIIntro.tsx`, `useCLIIntro.ts`, `TerminalWindow.tsx`, `TerminalPrompt.tsx`), mounted from `src/App.tsx`, shown once per visitor via the `portfolio-intro-seen` localStorage flag, skippable with Esc, with full `prefers-reduced-motion` handling. It types a short session (`whoami`, `cat portfolio.json`, `ls ~/projects`, `tree`), then zooms/blurs out and the app mounts underneath.

Niko is my personal brand mark: an orange (`--niko`, #D97757 dark / #c05621 light) half-block terminal creature. A simplified 9-frame version already exists in `src/components/NikoPet/` (13×6 grid, `float`/`inline`/`rail` variants, gated behind the `niko-pet-shown` flag). The **full movement spec** lives at `docs/niko-frames.js`: a dependency-free engine with a pose generator (ears/eyes/mouth/legs/squash/tall), **19 movements** (idle, blink, look, walk, hop, stretch, wave, turn, dance / think, happy, love, celebrate, eat, sad, error / sleep, poof, vanish), per-frame `dx`/`dy` offsets and fx glyphs (♥ ✦ ♪ ! z ···), an event→movement queue (`EVENTS`), an ambient loop (`AMBIENT`), day/night + idle sleep rules, and a `toHTML` serializer. That file is the source of truth for Niko's anatomy and motion — port it, don't reinvent it.

**Read these files before writing any code:** `src/index.css`, `src/data/site.ts`, `src/components/Intro/*`, `src/components/NikoPet/*`, `docs/niko-frames.js`, `src/layouts/ShellLayout.tsx`, `src/components/WindowChrome.tsx`, `src/components/PixelOverlay.tsx`, `src/components/CommandBar.tsx`, `src/components/SideRail.tsx`, `src/App.tsx`.

## Goal

Two intertwined outcomes:

1. Evolve the existing CLI intro into an immersive "boot sequence" whose payoff is unique: **the intro terminal window does not exit — it morphs into the site itself.** The visitor should feel like the portfolio is an OS that Niko boots for them, and the window they watched booting is the same window they end up browsing in.
2. Promote Niko from an opt-in easter egg to the **site's living brand mark**: a persistent, interactive pet that reacts to what the visitor does — in the intro AND across the main content — powered by the 19-movement spec engine.

## The sequence (creative direction, ~6–8s total, always skippable)

1. **Window drop-in.** The terminal window lands on the canvas exactly as `TerminalWindow` does today — same `--radius-window`, `--shadow-window`, macOS dots, `roger@portfolio:~` title from `site.shellTitle`. Nothing full-screen, nothing black: the intro uses the *same* canvas/panel tokens as the site, in whichever theme `useDarkMode` resolves.
2. **Boot, not banner.** Replace the current flat command list with a portfolio-OS boot log that stays true to my actual stack and data (`src/data/site.ts`, `src/data/projects.ts` — never invent facts). Beats, each with the existing typewriter treatment (keep the CSS-only per-char reveal from `AnimatedLine`; no per-char React state):
   - `$ ./boot portfolio-os` → short service checks with `[ ok ]` markers in `--color-accent`: `laravel`, `react`, `postgresql`, `deped-region-v systems`, each resolving fast (steps-based timing, like a real init log — lines land in small bursts, not a constant drip).
   - One check "hangs" for a beat — `mounting ~/projects (5 systems)…` — then resolves by printing the real project slugs (`irims-v eduleave library eurasian lrmis`) in accent. That single hitch is the moment of drama; keep it under 700ms.
   - `$ niko --wake` → Niko **materialises with the spec's `poof` move (░▒▓ dissolve-in), then `wave`** in a rail beside the log, as if he ran the boot. While the remaining lines type he plays `think` (eyes up, ··· builds); when the boot completes he plays `celebrate → happy`, exactly per the spec's event map. He appears for every first-time visitor — no flag gate in the intro.
   - `$ whoami` → one accent line: name, role, region — pulled from `site`, not hardcoded.
3. **The interactive prompt, upgraded.** Keep the ending prompt (`TerminalPrompt`) but make it real: `enter` / Enter key / click proceeds as today, and additionally map `about`, `projects`, `contact`, `feedback` to their routes so a visitor who types `projects` boots straight into that view. Unknown input keeps today's playful `command not found` echo. Keep the current auto-proceed grace timer and Esc skip. Add a visible, quiet skip affordance (`[esc] skip`) in `label`-style type from the first frame — immersion must never hold anyone hostage.
4. **The morph (signature move — this is what makes it unique).** On proceed, do NOT zoom/blur away. Instead:
   - FLIP-animate the intro terminal window from its centered intro geometry to the exact geometry of the app's main window in `ShellLayout` (measure both rects; animate `transform` + size only, ~600ms, `cubic-bezier(.16,.16,.05,1)` to match existing motion).
   - While the window travels, sweep the pixel-tile curtain (reuse `PixelOverlay`'s tiles and the `--color-curtain`/`--color-curtain-2` tokens) across the window body, so the boot log dissolves tile-by-tile into the mounted app content — the same transition language the site already uses between views.
   - The title bar text stays `roger@portfolio:~` throughout, and the macOS dots must not jump: they are the anchor that sells "same window."
   - After the morph, remove the intro from the DOM entirely and hand focus to the app (first focusable element or the routed view's heading).
   - **Niko survives the morph.** He does not dissolve with the boot log: he `walk`s out of the terminal body during the curtain sweep and lands in his permanent dock (below). One continuous character from intro to site — that continuity IS the brand.

## Niko — the brand pet (intro + main content)

### Engine first

Port `docs/niko-frames.js` into TypeScript at `src/components/NikoPet/engine.ts`: the pose generator, all 19 `ANIMATIONS` (with fps, `once`, `dx`/`dy`, fx), `compose`, and the `EVENTS` + `AMBIENT` tables. Render through the existing `.niko-cell--*` CSS classes and design tokens (body `--niko`, fx accents may use `--color-accent` / `--color-accent-2` — never the spec's raw `#ec3013`, it's off-palette). Replace the hand-drawn 9-frame set in `nikoFrames.ts` with frames generated by the engine, keeping the current laptop-lid/chair/screen-spill idle silhouette as the `idle` base pose if feasible. Reuse the existing `NikoPet` props API (`variant`, `frame`, `reduced`) so current call sites keep working.

Add a `NikoProvider` (context, mounted in `App.tsx`) exposing `niko.event(name)` with the spec's queue semantics: events map to movement queues via `EVENTS`, one-shots return to ambient, `AMBIENT` free-runs between events, sleep after ~3 quiet minutes or 22:00–07:00 local. Reduced motion → single static frame, no timers.

### Where he lives (placement plan)

| Surface | Placement | Behaviour |
|---|---|---|
| **Intro** | Rail beside the boot log (existing `rail` variant) | `poof → wave` on `$ niko --wake`, `think` while lines type, `celebrate → happy` on boot complete, `walk`s into his dock during the morph |
| **Desktop app shell** | Docked at the bottom of the `SideRail`, above the "Open to work" `StatusDot` (its `mt-auto` block) — his "corner of the terminal" per the spec | Ambient loop; name tag `NIKO` in `label` type; when the rail is collapsed (68px) swap to a compact centered sprite, no tag |
| **Mobile / rail closed** | Existing `float` variant, bottom-right above the command bar, small and unobtrusive | Same reactions; a long-press or `×` affordance hides him for the session (persist `niko-hidden`) |
| **404 / empty states** | Inline variant beside the message | `sad` (ears droop) — turns dead ends into a brand moment |

He is **on by default** everywhere (he's the brand, not an easter egg): repurpose `niko-pet-shown` into an opt-*out* flag and keep `?intro-debug=1` able to reset both flags.

### What he reacts to (site events → spec movements)

Wire real app events into `niko.event(...)` using the spec's event map as the vocabulary:

- Route/view change (the pixel-curtain tick from `TransitionTickProvider`) → `walk` (he trots while the curtain sweeps)
- Command bar: submit → `think`; recognised command → `happy`; unknown command → `error → sad`
- Contact form: sending → `think`; success → `celebrate → happy`; failure → `error → sad`
- Theme toggle → `blink`, then `look` (checks both sides of the new theme)
- Résumé download / external project link click → `wave` (goodbye beat)
- Long hover on a project card or opening a project modal → `look`
- **Click/tap Niko himself → `love`** (♥ drift — petting him); double-click → `eat` (snack ●); make both discoverable via a one-line tooltip on first hover
- Add playful commands to `CommandBar`: `niko` (hop), `pet niko`, `feed niko`, `niko dance` — they route to the same events

Throttle: user-triggered reactions pre-empt ambient but never queue more than ~2 moves deep (drop, don't backlog). All fx glyphs and the name tag render in mono at the sprite's font size; nothing overlaps interactive controls.

## Hard constraints

- **Design tokens only.** Every color comes from the vars in `src/index.css` (`--color-canvas`, `--color-panel`, `--color-accent`, `--color-accent-2`, `--niko`, curtain colors…). No new hex values, no gradients, no glow, no scanlines, no Matrix rain, no CRT filters — flat colors are the house style. Both themes must look intentional; test light AND dark.
- **Motion discipline.** Animate only `transform` and `opacity` (tile fades excepted, matching `PixelOverlay`). No layout thrash during the morph; measure once, then animate. 60fps on a mid-range phone.
- **Reduced motion.** `prefers-reduced-motion: reduce` → render the final boot log instantly, skip the morph, mount the app with a plain fade, exactly in the spirit of the current implementation.
- **Keep the contract.** `portfolio-intro-seen` gating, the `portfolio-intro-reset` event, `?intro-debug=1` reset button, and `App.tsx`'s mounting logic keep working. The intro remains a self-contained unit under `src/components/Intro/`.
- **Mobile.** The intro window is already near-full-width on phones; the morph must still read there (it may reduce to a scale/settle plus curtain sweep if the rect delta is trivial).
- **Accessibility.** The overlay keeps an appropriate aria treatment, Esc always works, the skip hint is visible, and no line of boot text falls below the site's contrast bar (use `--color-text-2`/`text-3` roles as the existing intro does).
- **Tests.** Update `tests/portfolio.spec.ts` so the intro spec still passes, and add coverage for: skip via Esc, typed `projects` routing to the projects view, the seen-flag short-circuit, Niko present in the intro and docked in the rail after the morph, click-to-pet firing the `love` move, and the reduced-motion static render.
- **Niko discipline.** The engine stays dependency-free and framework-agnostic (`engine.ts` exports pure functions/data; React lives only in the components). Frame stepping uses one timer in the provider, not per-cell animation. Sprite + fx respect the "flat colours only, no glow" rule from `index.css`.

## Process

Work in stages and show me the result after each: (1) port `docs/niko-frames.js` → `engine.ts` + `NikoProvider`, with a `?niko-debug=1` panel that plays any movement by name, (2) rewrite the step sequence in `useCLIIntro.ts` (boot log + Niko wake/think/celebrate beats), (3) the prompt→route mapping, (4) the FLIP morph + curtain handoff with Niko walking to his SideRail dock, (5) site-event wiring (command bar, contact form, theme, routes, pet/feed), (6) reduced-motion/mobile/tests pass. Don't touch unrelated files; don't reformat existing code. If a beat conflicts with something you find in the repo, follow the repo and tell me.
