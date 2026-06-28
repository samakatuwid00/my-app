## ADDED Requirements

### Requirement: Dashboard View
The system SHALL display a main dashboard with resort overview statistics including total reservations, occupancy rate, revenue summary, and recent bookings.

#### Scenario: Dashboard loads with mock data
- **WHEN** user navigates to the resort demo landing page
- **THEN** system displays dashboard cards with total reservations count, occupancy percentage, revenue figure, and recent booking list

#### Scenario: Dashboard responsive layout
- **WHEN** user views dashboard on mobile or tablet viewport
- **THEN** system adjusts grid layout to single column for statistics cards

### Requirement: Reservation Management
The system SHALL provide a reservations list view with search, filter, and status management capabilities using mock data.

#### Scenario: View all reservations
- **WHEN** user navigates to reservations page
- **THEN** system displays a table of mock reservations with guest name, room type, check-in date, check-out date, and status

#### Scenario: Search reservations
- **WHEN** user types in the search input field
- **THEN** system filters the reservation list to show only entries matching the search query

#### Scenario: Filter by status
- **WHEN** user selects a status filter (Confirmed, Pending, Cancelled)
- **THEN** system displays only reservations with the selected status

### Requirement: Booking Workflow
The system SHALL display a booking interface showing room availability and booking form with mock room data.

#### Scenario: View available rooms
- **WHEN** user navigates to bookings page
- **THEN** system displays a grid of room cards showing room type, price per night, amenities, and availability status

#### Scenario: Room availability indicator
- **WHEN** room data is loaded
- **THEN** system visually indicates available rooms with green badge and unavailable rooms with red badge

### Requirement: Guest Records
The system SHALL maintain a guest directory with contact information and booking history using mock data.

#### Scenario: View guest list
- **WHEN** user navigates to guests page
- **THEN** system displays a list of guests with name, email, phone, total bookings, and last visit date

#### Scenario: Search guests
- **WHEN** user types in guest search input
- **THEN** system filters the guest list to show only entries matching the search query

### Requirement: Reporting Interface
The system SHALL display reporting dashboards with occupancy charts, revenue summary, and booking trends using mock data.

#### Scenario: View occupancy report
- **WHEN** user navigates to reports page
- **THEN** system displays occupancy percentage visualization with monthly breakdown

#### Scenario: View revenue summary
- **WHEN** reports page loads
- **THEN** system displays total revenue, average booking value, and peak season indicator

### Requirement: Mock Data Layer
The system SHALL use a centralized mock data layer that provides all resort data without any backend API calls.

#### Scenario: All features use mock data
- **WHEN** any page loads or user performs an action
- **THEN** system retrieves data from local TypeScript mock files instead of making HTTP requests

#### Scenario: Mock data format matches API structure
- **WHEN** mock data is consumed by components
- **THEN** data structures match the expected PHP backend response format for easy future migration

### Requirement: Vercel Deployment
The system SHALL be deployable as a static site on Vercel with zero server dependencies.

#### Scenario: Static build
- **WHEN** build command is executed
- **THEN** system produces static HTML, CSS, and JavaScript files in the build output directory

#### Scenario: Vercel configuration
- **WHEN** deployed to Vercel
- **THEN** system serves all pages as static content without requiring any server-side rendering
