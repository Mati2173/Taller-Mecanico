import { useState, useEffect, useCallback, useRef } from 'react';
import { getAllVehicles } from '../../utils/api';

export default function useVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({});
    const previousFilter = useRef(null);

    const fetchVehicles = useCallback(async (filter) => {
        setIsLoading(true);
        
        const response = await getAllVehicles(filter);
        
        if (response.vehicles) {
            setVehicles(response.vehicles);
        } else {
            setVehicles([]);
            console.log("Error - Fetching vehicles: ", response.error);
        }
        
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (JSON.stringify(previousFilter.current) !== JSON.stringify(filter)) {
            fetchVehicles(filter);
            previousFilter.current = filter;
        }
    }, [filter]);

    return { isLoading, vehicles, setFilter };
};
