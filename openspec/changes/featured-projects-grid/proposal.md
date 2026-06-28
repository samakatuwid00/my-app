## Why

The current equal-width project grid gives every project the same visual weight and becomes harder to scan as more live demos are added. The portfolio needs a durable hierarchy that keeps the first project prominent while allowing every additional project to flow into a responsive, easy-to-browse grid.

## What Changes

- Treat the first entry in the existing `projects` array as the flagship project and every later entry as a secondary project.
- Present the flagship in a larger, clearly labeled card with a taller preview image and stronger title treatment.
- Present secondary projects in a responsive two-column desktop grid that collapses to a single column on smaller screens.
- Extend the reusable `ProjectCard` with a typed featured/default variant rather than duplicating card markup.
- Preserve all existing project content, links, previews, technology and feature lists, animations, brutalist styling, hover behavior, and dark-mode treatment.
- Keep the layout data-driven so newly appended projects automatically join the secondary grid without section markup changes.

## Capabilities

### New Capabilities

- `project-showcase-hierarchy`: Defines flagship selection, featured presentation, responsive secondary-project flow, and preservation of existing project-card behavior.

### Modified Capabilities

(No existing specs to modify.)

## Impact

- Affected code: `src/pages/HomePage.tsx`, specifically the project collection derivation, `ProjectCard`, and Featured Projects section.
- Public APIs and project data shape remain unchanged; the card receives one new optional local prop.
- No new packages, runtime services, routes, or assets are required.
- TypeScript, lint, and production build behavior must remain clean.
