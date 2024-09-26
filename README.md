# Vehicle and Service Management System

This application was developed to assist in managing an auto repair shop by allowing the storage and organization of vehicle information and the services performed on them. It consists of a backend built with Django Rest Framework and a frontend developed with React.

## Description

The application helps an auto repair shop owner keep track of the vehicles that come into the shop and the services performed on them, making it easier to manage the work and client information.

## Technologies

The backend is developed using Django Rest Framework, while the frontend is built with React to create a dynamic user interface. The styling is handled with Tailwind CSS and Flowbite React, providing styled components and a modern user experience. Additionally, Axios is used to handle HTTP requests, and React Router is used for navigation between different views.

## Features

- **Vehicle management**: Register vehicles with information about the owner, license plate, brand, model, year, and more.
- **Service management**: Record the services performed on each vehicle, including details such as date, mileage, title, and description.
- **Vehicle filtering**: Custom search for vehicles by license plate, brand, model, year, or owner's name.
- **Service history**: Ability to add multiple services to a vehicle and view the service history.
- **Interactive interfaces**: User-friendly frontend design with reusable components.

## Usage

### API Endpoints

- **Vehicles**:
  - `GET /api/vehicles/`: List all vehicles.
  - `GET /api/vehicles/{number_plate}/`: Retrieve details of a specific vehicle along with its services.
  - `POST /api/vehicles/`: Create a new vehicle.
  - `PUT /api/vehicles/{number_plate}/`: Update vehicle information.
  - `DELETE /api/vehicles/{number_plate}/`: Delete a vehicle.
  - `GET /api/vehicles/search/`: Search for vehicles by license plate, brand, model, year, or owner's name using query parameters (e.g. `?number_plate=AAA 111`).
  - `GET /api/vehicles/no_services/{number_plate}/`: Retrieve vehicle details without associated services.

- **Services**:
  - `GET /api/services/`: List all services.
  - `GET /api/services/{id}/`: Retrieve details of a specific service.
  - `POST /api/services/`: Create a new service for a vehicle.
  - `PUT /api/services/{id}/`: Update an existing service.
  - `DELETE /api/services/{id}/`: Delete a service.

### Frontend

- **Routes**:
  - `/inicio`: Home page.
  - `/vehiculos`: List of vehicles.
  - `/vehiculos/nuevo`: Add a new vehicle.
  - `/vehiculos/editar/:number_plate`: Edit a vehicle.
  - `/servicios`: List of services.
  - `/servicios/:number_plate`: Service history for a specific vehicle.
  - `/servicios/nuevo/:number_plate`: Add a new service for a vehicle.
  - `/servicios/editar/:id`: Edit a service.
