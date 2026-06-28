## Context

`HomePage.tsx` owns a typed `projects` array and renders every entry through one reusable `ProjectCard`. The Featured Projects section currently maps that array directly into `lg:grid-cols-3`, so IRIMS-V has the same weight as every other project and the layout has no explicit growth path. The card already contains the preview/fallback image, project metadata, live-demo action, Framer Motion behavior, brutalist borders and shadows, and dark-mode classes; those behaviors must remain shared.

## Goals / Non-Goals

**Goals:**

- Establish an automatic first-item flagship hierarchy.
- Make the flagship visibly larger while preserving the existing card vocabulary.
- Let all later projects flow through a responsive secondary grid with no per-project layout markup.
- Keep the project data type and content intact.
- Preserve TypeScript, lint, animation, hover, accessibility, and dark-mode behavior.

**Non-Goals:**

- Reordering or rewriting the project records.
- Changing live-demo destinations, previews, features, technologies, or fallback content.
- Extracting the card into a new file or introducing a generalized design system.
- Adding carousel, filtering, pagination, or new dependencies.
- Reworking any portfolio section outside Featured Projects.

## Decisions

### 1. Derive hierarchy from array position

Define `flagshipProject = projects[0]` and `secondaryProjects = projects.slice(1)` next to the project data. Render the flagship conditionally and map the secondary collection normally. This makes the ordering in the existing array the only source of truth and ensures appended projects require no JSX changes.

Alternative considered: add an `isFeatured` property to `Project`. That would change the data contract, permit ambiguous multiple-featured states, and conflict with the requirement that the first entry always wins.

### 2. Add a typed optional card variant

Change `ProjectCard` to accept `variant?: 'default' | 'featured'` with `default` as the fallback. Variant-specific class choices will control the article layout, preview height and border orientation, content spacing, and title scale. Shared image fallback, feature list, technology chips, action, motion, colors, and interactions remain in one render tree.

Alternative considered: create a separate `FeaturedProjectCard`. Although initially simple, that duplicates a large markup tree and invites visual and behavioral drift.

### 3. Make the flagship full-width and horizontally composed at large breakpoints

Place the flagship in its own full-width container. It remains vertically stacked at small and medium widths; at `lg` it can use a two-area composition with the preview and content side by side. The preview uses a taller small-screen height than the default card and a suitable large-screen minimum height so the flagship reads as the dominant item. A compact uppercase mono label such as `Flagship Project` appears in the content area using the existing yellow accent, heavy border, and dark-mode palette.

Alternative considered: keep the same vertical card and only span grid columns. The width would change, but the hierarchy would be weaker and the content would leave excessive horizontal whitespace on large screens.

### 4. Use an independent responsive secondary grid

Render `secondaryProjects` below the flagship with a top gap and a grid that is one column by default and two columns from a suitable tablet/desktop breakpoint. Each item continues to use the default card and `h-full`, allowing rows to align while any number of projects wraps naturally.

Alternative considered: keep one parent grid and make the first child span columns. Separating the two regions makes spacing and future wrapping explicit and avoids index-dependent grid classes inside the card loop.

### 5. Preserve current interaction semantics

The featured variant will not change `whileHover`, link behavior, image alternative text, dark-mode classes, fallback preview, or project data rendering. Responsive changes are expressed only through existing Tailwind utilities, so no CSS module, package, or new runtime state is needed.

## Risks / Trade-offs

- **Risk:** A horizontal flagship can become too tall when a project has many features or technology chips. → **Mitigation:** Let the content determine height and use `h-full`/minimum-height behavior for the preview instead of a fixed desktop height.
- **Risk:** Featured-only border changes can create a doubled or missing divider at the large breakpoint. → **Mitigation:** explicitly switch from bottom border to right border in the featured large-screen layout while retaining the current divider on stacked layouts.
- **Risk:** Adding an odd number of secondary projects leaves the final desktop row half full. → **Mitigation:** accept natural CSS Grid flow; the remaining card keeps a readable column width and future additions fill the open slot automatically.
- **Trade-off:** Array order becomes a visible editorial decision. This is intentional and keeps flagship selection simple and predictable.

## Migration Plan

1. Add the derived flagship and secondary collections without changing the project records.
2. Extend `ProjectCard` with the optional variant and conditional Tailwind classes.
3. Replace the flat project grid with a flagship region followed by the secondary grid.
4. Run lint and the production build, then verify the section at mobile, tablet, and desktop widths in both color modes.

Rollback is a local JSX refactor: restore the flat `projects.map` grid and remove the optional variant and derived collections. No data or external migration is involved.

## Open Questions

None. The requested first-item rule, visual treatment, and responsive hierarchy fully determine the implementation direction.
