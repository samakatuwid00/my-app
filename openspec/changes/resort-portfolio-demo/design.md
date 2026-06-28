## Context

The existing Resort Management System is a full-stack application built with PHP (backend), Vue.js (frontend), PostgreSQL (database), and SMTP (email). It handles resort reservations, booking workflows, guest records, management dashboards, and reporting. This system cannot be deployed on Vercel as a live demo because it requires a PHP server and PostgreSQL database.

A static React + TypeScript frontend replica is needed for portfolio purposes to demonstrate the UI/UX capabilities of the system without any backend dependencies.

## Goals / Non-Goals

**Goals:**
- Create a visually identical React + TypeScript frontend matching the original PHP + Vue.js design
- Use static mock data for all features (reservations, bookings, guests, reports)
- Deploy as a static site on Vercel with zero server dependencies
- Maintain the existing portfolio app's design language (brutalist style, dark mode, animations)
- Provide interactive UI elements (forms, filters, modals) using mock data

**Non-Goals:**
- Implementing real backend functionality or API connections
- Connecting to any MySQL or PostgreSQL database
- Building actual email/SMTP functionality
- Modifying the existing PHP backend code
- Creating a fully functional reservation system

## Decisions

**Decision 1: Project Structure**
- Create a new `/resort-demo` folder at the repository root
- Separate from the existing portfolio app to maintain independence
- Allows independent Vercel deployment

**Decision 2: Tech Stack**
- React + TypeScript (matching existing portfolio stack)
- Tailwind CSS (consistent styling)
- Framer Motion (consistent animations)
- React Router (for demo navigation)

**Decision 3: Mock Data Layer**
- Centralized `mock/` directory with TypeScript mock data files
- All data structures mirror the expected PHP backend response format
- Static JSON-like data for resorts, rooms, reservations, guests, reports

**Decision 4: Routing**
- `/resort-demo/` - Dashboard/landing page
- `/resort-demo/reservations` - Reservation management
- `/resort-demo/bookings` - Booking workflow
- `/resort-demo/guests` - Guest records
- `/resort-demo/reports` - Reporting interface

## Risks / Trade-offs

**Risk:** Visual drift from original design
→ **Mitigation:** Reference original screenshots/designs during implementation; use identical color schemes and component patterns

**Risk:** Mock data may not cover all edge cases
→ **Mitigation:** Create comprehensive mock datasets that demonstrate all UI states (empty, loading, populated, error)

**Risk:** Deployment complexity with separate Vercel project
→ **Mitigation:** Use Vercel's monorepo support or deploy as a standalone project with clear README

**Trade-off:** Static data cannot demonstrate real-time updates
→ **Acceptance:** UI interactions (filters, search, forms) will use local state only; data changes are not persisted
