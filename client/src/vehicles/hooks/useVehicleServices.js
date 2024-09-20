import { useState, useEffect, useCallback } from 'react';
import { getVehicle } from '../../utils/api';

export default function useVehicleServices({ number_plate }) {
    const [vehicle, setVehicle] = useState({});
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        const response = await getVehicle({ number_plate, with_services: true });

        if (response.vehicle) {
            setVehicle(response.vehicle);
            setServices(response.vehicle.services);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return { isLoading, vehicle, services };
};
