## Why

The existing Resort Management System is a PHP + Vue.js + PostgreSQL application that cannot be deployed as a live demo on Vercel for portfolio purposes. A static React + TypeScript frontend replica is needed to showcase the system's UI/UX and features to potential clients and employers without requiring a backend server or database connection.

## What Changes

- Create a new standalone React + TypeScript application that replicates the Resort Management System's frontend
- Use mock/static data for all reservation, booking, guest, and reporting features
- Deploy as a static site on Vercel with zero backend dependencies
- Maintain visual parity with the original PHP + Vue.js application
- No connection to real MySQL database or PHP backend

## Capabilities

### New Capabilities
- `resort-frontend`: Static React + TypeScript frontend replicating the resort reservation system UI with mock data, including booking forms, reservation management, guest records, dashboard views, and reporting interfaces

### Modified Capabilities

(No existing specs to modify)

## Impact

- New standalone React + TypeScript project (or subfolder) in the repository
- New mock data layer replacing all PHP API endpoints
- Vercel deployment configuration
- No changes to existing PHP backend or MySQL database
- New dependencies: React, TypeScript, Tailwind CSS (matching existing stack)
