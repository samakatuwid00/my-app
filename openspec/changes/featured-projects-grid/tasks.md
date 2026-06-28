## 1. Project Hierarchy

- [x] 1.1 Derive `flagshipProject` from `projects[0]` and `secondaryProjects` from `projects.slice(1)` without changing any project records
- [x] 1.2 Replace the flat project map with a conditional flagship region followed by a mapped secondary-project region

## 2. Reusable Card Variant

- [x] 2.1 Add a typed optional `default | featured` variant prop to `ProjectCard` with default behavior preserved
- [x] 2.2 Add featured-only flagship label, taller preview sizing, larger title treatment, and responsive wide-card layout using existing Tailwind utilities
- [x] 2.3 Preserve shared preview fallback, project metadata, Live Demo action, motion, hover, border, shadow, and dark-mode behavior in both variants

## 3. Responsive Layout and Verification

- [x] 3.1 Configure the secondary region as a one-column mobile grid and two-column wider-screen grid with natural wrapping for additional projects
- [x] 3.2 Verify IRIMS-V is the flagship and the two current remaining projects render below it without duplicated or missing content
- [x] 3.3 Check the section at representative mobile, tablet, and desktop widths in light and dark modes
- [x] 3.4 Run `npm run lint` and `npm run build`, resolving any TypeScript, lint, or unused-code errors introduced by the change
