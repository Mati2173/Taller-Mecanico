import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTitle({ title }) {
    const location = useLocation();

    useEffect(() => {
        document.title = `Taller Mecánico | ${title}`;
    }, [location, title]);

    return <></>;
}
