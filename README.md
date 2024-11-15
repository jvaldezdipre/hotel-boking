# Hotel Booking Application

## Overview

The Hotel Booking Application allows users to manage hotel reservations, room types, and user authentication.

## Features

- **User Authentication**: Secure login and logout functionality.
- **Reservation Management**: Create, view, and manage hotel reservations.
- **Room Type Management**: View and manage different types of rooms available in the hotel.
- **Protected Routes**: Ensure that only authorized users can access certain parts of the application.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tools Used

- **Frontend**: React.js
- **Backend**: Axios for api requests
- **Routing**: React Router for navigation
- **State Management**: React Hooks

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://gitlab.com/mtc-cce1/mtc-cce-wdev/june-2024/jeffrey-valdez-dipre/hotel-booking
   cd hotel-booking
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the application**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173/` to view the application.

## Usage

- **Login**: Use the login page to authenticate with your email and password.
- **Reservations Page** Displays all the reservations with a create button.
- **Create Reservation**: Navigate to the create reservations page to create a new reservation.
- **Edit Reservation**: Navigate to the edit reservations page to edit a reservation.
- **Manage Room Types**: If you are a manager, you can view and edit room types.
- **Logout**: Use the logout link in the navigation bar to log out of the session.

## File Structure

- **src/components**: Contains all the React components used in the application.

  - **form**: Components related to form inputs and validation.
  - **nav-bar**: Navigation bar component.
  - **reservations**: Components related to reservation management.
  - **room-types**: Components related to room type management.
  - **protected-route**: Component for route protection.
  - **login/logout**: Components for user authentication.
  - **not-found**: Component for handling 404 errors.
  - **loading**: Component for displaying loading states.

  ## Linting

To maintain code quality and consistency, we use ESLint. Ensure you have ESLint installed and configured in your project.

1. **Install ESLint**:

   ```bash
   npm install eslint --save-dev
   ```

2. **Run ESLint**:

   ```bash
   npm run lint
   ```

   This will check your code for any linting errors and help you maintain a clean codebase.

## Testing

We use Vitest for testing our components.

1. **Install Vitest**:

   ```bash
   npm install vitest --save-dev
   ```

2. **Run Tests**:

   ```bash
   npm run test
   ```

   This will execute all test files and provide feedback on the test results.

3. **Writing Tests**:

   - Tests are located in the `src/tests` directory.

## Hotel Bookings API

### Overview

API for the Hotel Bookings Frontend Frameworks module project.

### Usage

- This API will be hosted on localhost:8080 and requires access to a Postgres database on port 5432.

### Starting the Application with Postgres

Ensure that your Postgres database is available and configured with the following options:

- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=root`
- `PORT=5432`

The `DataLoader` class in the data package will load a few examples of each entity (Users, Reservation, Room Type) into the database after the service starts up.

### Running the Application

Navigate to `src/main/java/edu/midlands` for `AppRunner.java`. If starting in IntelliJ, right-click Application, then click run. After this has been done, the application may be run subsequently with the green play symbol in the top right corner. Ensure the dropdown selection is at `HotelApiApplication`.

### Autoloaded Users

- **Manager**:
  - Email: `manager@hotelapi.com`
  - Password: `password`
- **Employee**:
  - Email: `employee@hotelapi.com`
  - Password: `password`

### API Endpoints

#### User Authentication

- **Login**:
  - Method: `POST`
  - URI: `http://localhost:8080/login`
  - Example JSON:
    ```json
    {
      "email": "manager@hotelapi.com",
      "password": "password"
    }
    ```

#### Reservation API

- **Create a reservation**: `POST /reservations`
- **Read all reservations**: `GET /reservations`
- **Read a reservation by id**: `GET /reservations/{id}`
- **Update a reservation**: `PUT /reservations/{id}`
- **Delete a reservation**: `DELETE /reservations/{id}`

#### Room Type API

- **Create a room type**: `POST /room-types`
- **Read all room types**: `GET /room-types`
- **Read a room type by id**: `GET /room-types/{id}`
- **Update a room type**: `PUT /room-types/{id}`

### Response Messages

- **200 OK**: Successful operation.
- **201 Created**: Resource successfully created.
- **204 No Content**: Resource successfully deleted.
- **400 Bad Request**: Invalid input.
- **403 Forbidden**: Unauthorized access.
- **404 Not Found**: Resource not found.
- **405 Method Not Allowed**: Incorrect HTTP method used.
