import { useParams } from 'react-router-dom';
import PageTitle from '../../common/components/PageTitle';

export default function EditService() {
    const { id } = useParams();

    return (
        <>
            <PageTitle title={`Editar Servicio - N° ${id}`} />
            Edit Service
        </>
    );
}
