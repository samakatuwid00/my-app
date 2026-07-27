import { site } from '../data/site'

// Static across all three sub-views. It is the one part of /about that is not a
// section, so it sits above the tab bar and never remounts — switching tabs
// changes the panel underneath and nothing else.
//
// Name and role share a line rather than stacking. Stacked they cost 57px on
// every tab, and because this block is static that 57px is charged three times;
// side by side it is 31px. Nothing is dropped — the role still reads, it just
// stops taking a row of its own.
export function AboutHeader() {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h1 className="text-[clamp(1.125rem,2.2vw,1.5rem)] font-bold uppercase leading-[1.15] tracking-[0.08em] text-text">
        {site.name}
      </h1>
      <p className="text-sm text-accent-2">{site.role}_</p>
    </div>
  )
}
