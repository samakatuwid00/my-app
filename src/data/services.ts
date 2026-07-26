export type ServiceOffer = {
  id: string
  name: string
  pitch: string
}

// Named for what a client is buying, not for what gets built. The previous list
// ("API integration", "maintainable system architecture") described the work to
// someone who already knows how to do it.
//
// Payments are deliberately absent from the integrations offer: nothing in the
// shipped systems handles them, and an offer is a claim.
export const services: ServiceOffer[] = [
  {
    id: 'digitize',
    name: 'Turn your Excel or paper process into a web system',
    pitch: 'Scattered spreadsheets and folders become one system your team can open, search, and trust.',
  },
  {
    id: 'bookings',
    name: 'Online booking & reservations for your business',
    pitch: 'Customers book themselves in instead of messaging you, and every reservation lands in one calendar.',
  },
  {
    id: 'workflow',
    name: 'HR & approval workflow automation',
    pitch: 'Requests route themselves, approvals are recorded, and balances stop being recomputed by hand.',
  },
  {
    id: 'dashboards',
    name: 'Dashboards that show your business at a glance',
    pitch: 'One screen for what came in, what is pending, and what needs attention today.',
  },
  {
    id: 'integrations',
    name: 'System integrations (APIs, email, Google Sheets)',
    pitch: 'Your system talks to the tools you already run, so the same number is not typed in twice.',
  },
  {
    id: 'retainer',
    name: 'Ongoing maintenance, hosting & support',
    pitch: 'Monthly retainer: it stays online, stays updated, and someone answers when it breaks.',
  },
]
