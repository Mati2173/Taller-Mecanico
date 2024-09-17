import axios from 'axios';

/**
 * URL of the API endpoint
 */
const API_URL = 'http://localhost:8000/api';

/**
 * Header configuration
 */
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

/**
 * Retrieves all vehicles information, optionally filtered by a specific parameter.
 * @param {Object} [filter] - Optional filter for vehicle search (e.g., { owner_name: 'matias' }).
 * @returns {Object} Object containing an array of vehicles.
 * - `vehicles`: Array of objects, each representing a vehicle.
 * - `error`: Specific error information in case of failure.
 */
export async function getAllVehicles(filter = {}) {
    let URL = `${API_URL}/vehicles/`;
    
    if (filter) {
        const urlParam = new URLSearchParams(filter).toString();
        URL += `search/?${urlParam}`;
    }

    try {
        const response = await axios.get(URL, config);
        return { vehicles: response.data, error: null };
    } catch (error) {
        const response = error.response;
        return { vehicles: [], error: response?.data };
    }
}

/**
 * Retrieves a specific vehicle's information by its number plate, with an option to include its services.
 * @param {string} number_plate - The vehicle's number plate.
 * @param {boolean} [with_services] - Optional. If true, includes the vehicle's services in the response.
 * @returns {Object} Object containing the vehicle's data and optionally its services.
 * - `vehicle`: The vehicle object (with or without services) or `null` if not found.
 * - `error`: Specific error information in case of failure.
 */
export async function getVehicle({ number_plate, with_services = false }) {
    let URL = `${API_URL}/vehicles`;
    
    if (!with_services)
        URL += `/no_services`;
    
    try {
        const response = await axios.get(`${URL}/${number_plate}/`, config);
        return { vehicle: response.data, error: null };
    } catch (error) {
        const response = error.response;
        return { vehicle: null, error: response?.data };
    }
}

/**
 * Creates a new vehicle record in the backend.
 * @param {string} number_plate - Vehicle's number plate.
 * @param {string} brand - Vehicle's brand.
 * @param {string} model - Vehicle's model.
 * @param {number} year - Year of the vehicle.
 * @param {string} owner_name - Full name of the owner.
 * @param {string} owner_phone - Contact phone number of the owner.
 * @returns {Object} Object with the created vehicle data.
 * - `created`: Boolean indicating success or failure.
 * - `vehicle`: The created vehicle object or `null` in case of failure.
 * - `error`: Specific error information in case of failure.
 */
export async function createVehicle({ number_plate, brand, model, year, owner_name, owner_phone }) {
    const body = JSON.stringify({ number_plate, brand, model, year, owner_name, owner_phone });

    try {
        const response = await axios.post(`${API_URL}/vehicles/`, body, config);
        return { created: true, vehicle: response.data, error: null };
    } catch (error) {
        const response = error.response;
        return { created: false, vehicle: null, error: response?.data };
    }
}

/**
 * Updates an existing vehicle's information.
 * Only the fields that are not null will be updated.
 * @param {string} number_plate - Number plate of the vehicle to be updated
 * @param {string} [brand] - Updated brand (optional).
 * @param {string} [model] - Updated model (optional).
 * @param {number} [year] - Updated year (optional).
 * @param {string} [owner_name] - Updated owner name (optional).
 * @param {string} [owner_phone] - Updated owner phone (optional).
 * @returns {Object} Object containing the updated vehicle data.
 * - `edited`: Boolean indicating success or failure.
 * - `vehicle`: The updated vehicle object or `null` in case of failure.
 * - `error`: Specific error information in case of failure.
 */
export async function editVehicle({ number_plate, brand = null, model = null, year = null, owner_name = null, owner_phone = null }) {
    const body = JSON.stringify({
        ...(brand != null && { brand }),
        ...(model != null &&  { model }),
        ...(year != null &&  { year }),
        ...(owner_name != null &&  { owner_name }),
        ...(owner_phone != null && { owner_phone }),
    });
    
    try {
        const response = await axios.patch(`${API_URL}/vehicles/${number_plate}/`, body, config);
        return { edited: true, vehicle: response.data, error: null };
    } catch (error) {
        const response = error.response;
        return { edited: false, vehicle: null, error: response?.data };
    }
}

/**
 * Deletes a vehicle by its number plate.
 * @param {string} number_plate - The vehicle's number plate.
 * @returns {Object} Object indicating if the vehicle was successfully deleted.
 * - `deleted`: Boolean indicating success or failure.
 * - `error`: Specific error information in case of failure.
 */
export async function deleteVehicle(number_plate) {
    try {
        await axios.delete(`${API_URL}/vehicles/${number_plate}/`);
        return { deleted: true, error: null };
    } catch (error) {
        const response = error.response;
        return { deleted: false, error: response?.data };
    }
}

/**
 * Retrieves all services from the backend.
 * @returns {Object} Object containing an array of services.
 * - `services`: Array of objects, each representing a service.
 * - `error`: Specific error information in case of failure.
 */
export async function getAllServices() {
    try {
        const response = await axios.get(`${API_URL}/services/`, config);
        return { services: response.data, error: null };
    } catch (error) {
        const response = error.response;
        return { services: [], error: response?.data };
    }
}

/**
 * Retrieves a specific service's information by its ID.
 * @param {number} id - The service ID.
 * @returns {Object} Object containing the service data.
 * - `service`: The service object or `null` if not found.
 * - `error`: Specific error information in case of failure.
 */
export async function getService({ id }) {
    try {
        const response = await axios.get(`${API_URL}/services/${id}/`, config);
        return { service: response.data, error: null };
    } catch (error) {
        const response = error.response;
        return { service: null, error: response?.data };
    }
}

/**
 * Creates a new service record in the backend.
 * @param {string} number_plate - Vehicle's number plate.
 * @param {string} date - Date of the service.
 * @param {number} kilometer_age - Kilometer count at the time of the service.
 * @param {string} title - Title of the service.
 * @param {string} description - Description of the service.
 * @returns {Object} Object with the created service data.
 * - `created`: Boolean indicating success or failure.
 * - `service`: The created service object or `null` in case of failure.
 * - `error`: Specific error information in case of failure.
 */
export async function createService({ vehicle, date, kilometer_age, title, description }) {
    const body = JSON.stringify({ vehicle, date, kilometer_age, title, description });

    try {
        const response = await axios.post(`${API_URL}/services/`, body, config);
        return { created: true, service: response.data, error: null };
    } catch (error) {
        const response = error.response;
        return { created: false, service: null, error: response?.data };
    }
}

/**
 * Updates an existing service's information by its ID.
 * Only the fields that are not null will be updated.
 * @param {number} id - ID of the service to be updated.
 * @param {string} [date] - Updated date (optional).
 * @param {number} [kilometer_age] - Updated kilometer count (optional).
 * @param {string} [title] - Updated title (optional).
 * @param {string} [description] - Updated description (optional).
 * @returns {Object} Object containing the updated service data.
 * - `edited`: Boolean indicating success or failure.
 * - `service`: The updated service object or `null` in case of failure.
 * - `error`: Specific error information in case of failure.
 */
export async function editService({ id, date = null, kilometer_age = null, title = null, description = null }) {
    const body = JSON.stringify({
        ...(date != null && { date }),
        ...(kilometer_age != null && { kilometer_age }),
        ...(title != null && { title }),
        ...(description != null && { description })
    });

    try {
        const response = await axios.patch(`${API_URL}/services/${id}/`, body, config);
        return { edited: true, service: response.data, error: null };
    } catch (error) {
        const response = error.response;
        return { edited: false, service: null, error: response?.data };
    }
}

/**
 * Deletes a service by its ID.
 * @param {number} id - The service ID.
 * @returns {Object} Object indicating if the service was successfully deleted.
 * - `deleted`: Boolean indicating success or failure.
 * - `error`: Specific error information in case of failure.
 */
export async function deleteService(id) {
    try {
        await axios.delete(`${API_URL}/services/${id}/`);
        return { deleted: true, error: null };
    } catch (error) {
        const response = error.response;
        return { deleted: false, error: response?.data };
    }
}
