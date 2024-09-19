import { useState, useEffect, useCallback } from 'react';
import { getAllServices } from '../../utils/api';

export default function useServices() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchServices = useCallback(async () => {
        setIsLoading(true);
        
        const response = await getAllServices();
        
        if (response.services) {
            setServices(response.services);
        } else {
            setServices([]);
            console.log("Error - Fetching Services: ", response.error);
        }
        
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchServices();
    }, []);

    return { services, isLoading };
};
