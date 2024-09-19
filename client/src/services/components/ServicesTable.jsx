import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tooltip } from 'flowbite-react';
import { ConfirmDeleteModal, ErrorModal } from '../../common/components/Modals';
import ViewDetailModal from './ViewDetailModal';
import { NoRecords } from '../../common/components/NoMatch';
import Loading from '../../common/components/Loading';
import { DefaultButton, LinkButton } from '../../common/components/Buttons';
import { EditLogo, EyeLogo, TrashLogo } from '../../common/components/ImagesSVG';
import { formatDate } from '../../utils/helpers';
import { deleteService } from '../../utils/api';

const header = ['N°', 'Patente', 'Fecha', 'Kilometraje', 'Titulo', 'Acciones'];

export default function ServicesTable({ services, isLoading }) {
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewDetailModal, setShowViewDetailModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const navigate = useNavigate();

    const handleDelete = (service) => {
        setSelectedService(service);
        setShowDeleteModal(true);
    };

    const handleViewDetail = (service) => {
        setSelectedService(service);
        setShowViewDetailModal(true);
    };

    const confirmDelete = async () => {
        const response = await deleteService(selectedService.id);

        if (response.deleted) {
            setError(null);
            navigate(0);
        }
        else {
            console.error('Error - Deleting Service: ', response.error);

            if (response.error?.detail === "No Service matches the given query.")
                setError(`Ningún servicio coincide con el N° proporcionado: ${selectedService.id}`);
            else
                setError(null);
            
            setShowErrorModal(true);
        }
        
        setShowDeleteModal(false);
    };

    return (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
            <Table hoverable>
                <Table.Head className="text-base">
                    {header.map((headCell) => (
                        <Table.HeadCell className="bg-gray-200" key={headCell}>
                            {headCell}
                        </Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className="divide-y text-md">
                    {!isLoading && services?.map((service) => (
                        <TableRow
                            key={service.id}
                            service={service}
                            handleDelete={handleDelete}
                            handleViewDetail={handleViewDetail}
                        />
                    ))}
                </Table.Body>
            </Table>

            {isLoading && <Loading />}

            {!isLoading && services.length == 0 && (
                <NoRecords>
                    No se encontraron servicios para mostrar.
                    <br />
                    Agregá un nuevo servicio o intentá de nuevo más tarde.
                </NoRecords>
            )}

            <ViewDetailModal
                showModal={showViewDetailModal}
                setShowModal={setShowViewDetailModal}
                title={selectedService?.title}
                description={selectedService?.description}
            />

            <ErrorModal
                description={error}
                showModal={showErrorModal}
                setShowModal={setShowErrorModal}
            />

            <ConfirmDeleteModal
                title={`¿Está seguro que desea eliminar este servicio?`}
                description="Esta acción no se puede deshacer. Todos los detalles de este servicio se perderán permanentemente."
                showModal={showDeleteModal}
                confirm={confirmDelete}
                onClose={() => setShowDeleteModal(false)}
            />
        </div>
    );
}

function TableRow({ service, handleDelete, handleViewDetail }) {
    const { id, vehicle, date, kilometer_age, title } = service;

    return (
        <Table.Row className="bg-white">
            <Table.Cell className="whitespace-nowrap font-semibold text-gray-900">
                {id}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-semibold text-gray-900">
                {vehicle}
            </Table.Cell>
            <Table.Cell className="font-medium">
                {formatDate(date) || 'Sin información'}
            </Table.Cell>
            <Table.Cell className="font-medium">
                {kilometer_age || 'Sin información'}
            </Table.Cell>
            <Table.Cell className="font-medium">
                {title || 'Sin información'}
            </Table.Cell>
            <Table.Cell className="font-medium flex flex-row gap-4">
                <Tooltip content="Ver Detalle">
                    <DefaultButton onClick={() => handleViewDetail(service)}>
                        <EyeLogo />
                    </DefaultButton>
                </Tooltip>
                <Tooltip content="Editar">
                    <LinkButton to={`/servicios/editar/${id}`}>
                        <EditLogo />
                    </LinkButton>
                </Tooltip>
                <Tooltip content="Eliminar">
                    <DefaultButton onClick={() => handleDelete(service)}>
                        <TrashLogo />
                    </DefaultButton>
                </Tooltip>
            </Table.Cell>
        </Table.Row>
    );
}
