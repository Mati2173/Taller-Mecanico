import { useParams } from 'react-router-dom';
import PageTitle from '../../common/components/PageTitle';

export default function VehicleServices() {
    const { number_plate } = useParams();

    return (
        <>
            <PageTitle title={`Servicios del Vehículo - ${number_plate}`} />
            Vehicle Services
        </>
    );
}
