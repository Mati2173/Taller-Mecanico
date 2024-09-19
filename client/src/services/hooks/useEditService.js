import { useState, useEffect, useCallback } from 'react';
import { getService } from '../../utils/api';

export default function useEditService({ id }) {
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchService = useCallback(async () => {
        const response = await getService({ id });

        if (response.service) {
            setService(response.service);
        }
        else {
            console.error('Error - Fetching Service: ', response.error);
            
            if (response.error?.detail === "No Service matches the given query.")
                setService(null);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchService();
    }, []);

    return { service, isLoading };
};
