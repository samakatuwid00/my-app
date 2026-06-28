## ADDED Requirements

### Requirement: First project is the flagship
The Featured Projects section SHALL derive its flagship from `projects[0]` and SHALL derive all secondary projects from `projects.slice(1)` without changing the existing project data structure.

#### Scenario: Current project order
- **WHEN** the current three-project array is rendered
- **THEN** IRIMS-V appears once as the flagship and Leave Card Monitoring System and Resort Management System appear once as secondary projects

#### Scenario: Project order changes
- **WHEN** a different project is moved to the first array position
- **THEN** that project automatically becomes the flagship without a separate featured flag or section markup change

### Requirement: Flagship has a distinct featured presentation
The reusable `ProjectCard` SHALL support an optional `featured` variant while retaining `default` behavior when no variant is provided. The featured presentation SHALL include a visible flagship label, a taller preview region, and a larger title treatment than a default card.

#### Scenario: Flagship card rendering
- **WHEN** the first project is passed to `ProjectCard` with the featured variant
- **THEN** the card displays the flagship label and enhanced preview and title sizing while still displaying that project's description, features, technologies, preview, and Live Demo action

#### Scenario: Secondary card rendering
- **WHEN** a secondary project is passed without a variant
- **THEN** the card uses the existing default visual treatment and does not display the flagship label

### Requirement: Responsive showcase hierarchy
The Featured Projects section SHALL render the flagship in a full-width featured region followed by a responsive secondary-project grid. Project cards SHALL stack in one column on mobile, and secondary projects SHALL flow into two columns on wider tablet or desktop viewports.

#### Scenario: Mobile viewport
- **WHEN** the section is viewed at a mobile width
- **THEN** the flagship and every secondary project are stacked vertically without horizontal overflow

#### Scenario: Wide viewport
- **WHEN** the section is viewed at a desktop width
- **THEN** the flagship occupies the full available showcase width and the secondary projects appear in a two-column grid below it

#### Scenario: Additional projects
- **WHEN** five, six, or more projects exist in the array
- **THEN** the first project remains the sole flagship and every later project automatically wraps through the secondary grid

### Requirement: Existing project-card behavior is preserved
Both card variants MUST preserve the portfolio's existing brutalist borders and shadows, hover and Framer Motion behavior, dark-mode support, preview image and fallback rendering, project content, and Live Demo link behavior.

#### Scenario: Featured and default interactions
- **WHEN** a user views, hovers, or activates either card variant in light or dark mode
- **THEN** the existing motion, hover, contrast, border, shadow, and link behaviors remain available

### Requirement: Change remains dependency-free and type-safe
The implementation MUST use the existing React, TypeScript, Tailwind CSS, and Framer Motion stack, SHALL add no package dependency, and MUST introduce no unused import or variable.

#### Scenario: Static verification
- **WHEN** the project lint and production build commands are run after implementation
- **THEN** they complete without errors caused by the Featured Projects change
