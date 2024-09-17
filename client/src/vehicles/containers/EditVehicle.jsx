import { useParams } from 'react-router-dom';
import PageTitle from '../../common/components/PageTitle';

export default function EditVehicle() {
    const { number_plate } = useParams();

    return (
        <>
            <PageTitle title={`Editar Vehículo - ${number_plate}`} />
            Edit Vehicle
        </>
    );
}
