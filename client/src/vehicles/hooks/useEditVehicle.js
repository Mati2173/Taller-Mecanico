import { useState, useEffect, useCallback } from 'react';
import { getVehicle } from '../../utils/api';

export default function useEditVehicle({ number_plate }) {
    const [vehicle, setVehicle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVehicle = useCallback(async () => {
        const response = await getVehicle({ number_plate });

        if (response.vehicle) {
            setVehicle(response.vehicle);
        }
        else {
            console.error('Error - Fetching Vehicle: ', response.error);
            
            if (response.error?.detail === "No Vehicle matches the given query.")
                setVehicle(null);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchVehicle();
    }, []);

    return { isLoading, vehicle };
};
