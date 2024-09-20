import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tooltip } from 'flowbite-react';
import { ConfirmDeleteModal, ErrorModal } from '../../common/components/Modals';
import { NoRecords } from '../../common/components/NoMatch';
import Loading from '../../common/components/Loading';
import { DefaultButton, LinkButton } from '../../common/components/Buttons';
import { EditLogo, EyeLogo, TrashLogo } from '../../common/components/ImagesSVG';
import { formatVehicleInfo } from '../../utils/helpers';
import { deleteVehicle } from '../../utils/api';

const header = ['Patente', 'Vehículo', 'Dueño', 'Teléfono', 'Acciones'];

export default function VehiclesTable({ vehicles, isLoading }) {
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVechicle, setSelectedVehicle] = useState(null);

    const navigate = useNavigate();

    const handleDelete = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        const response = await deleteVehicle(selectedVechicle.number_plate);

        if (response.deleted) {
            setError(null);
            navigate(0);
        }
        else {
            console.error('Error - Deleting Vehicle: ', response.error);

            if (response.error?.detail === "No Vehicle matches the given query.")
                setError(`Ningún vehículo coincide con la patente proporcionada: ${selectedVechicle.number_plate}`);
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
                    {!isLoading && vehicles?.map((vehicle) => (
                        <TableRow
                            key={vehicle.number_plate}
                            vehicle={vehicle}
                            handleDelete={handleDelete}
                        />
                    ))}
                </Table.Body>
            </Table>

            {isLoading && <Loading />}
            
            {!isLoading && vehicles.length == 0 && (
                <NoRecords>
                    No se encontraron vehículos para mostrar.
                    <br />
                    Agregá un nuevo vehículo, ajustá los filtros de búsqueda o
                    intentá de nuevo más tarde.
                </NoRecords>
            )}

            <ErrorModal
                description={error}
                showModal={showErrorModal}
                setShowModal={setShowErrorModal}
            />

            <ConfirmDeleteModal
                title={`¿Está seguro que desea eliminar este vehículo? Patente: ${selectedVechicle?.number_plate}`}
                description="Esta acción no se puede deshacer. Todos los servicios asociados a este vehículo también serán eliminados."
                showModal={showDeleteModal}
                confirm={confirmDelete}
                onClose={() => setShowDeleteModal(false)}
            />
        </div>
    );
}

function TableRow({ vehicle, handleDelete }) {
    const { number_plate, brand, model, year, owner_name, owner_phone } = vehicle;

    return (
        <Table.Row className="bg-white">
            <Table.Cell className="whitespace-nowrap font-semibold text-gray-900">
                {number_plate}
            </Table.Cell>
            <Table.Cell className="font-medium">
                {formatVehicleInfo(brand, model, year) || 'Sin información'}
            </Table.Cell>
            <Table.Cell className="font-medium">
                {owner_name || 'Sin información'}
            </Table.Cell>
            <Table.Cell className="font-medium">
                {owner_phone || 'Sin información'}
            </Table.Cell>
            <Table.Cell className="font-medium flex flex-row gap-4">
                <Tooltip content="Ver Servicios">
                    <LinkButton to={`/servicios/${number_plate}`}>
                        <EyeLogo />
                    </LinkButton>
                </Tooltip>
                <Tooltip content="Editar">
                    <LinkButton to={`/vehiculos/editar/${number_plate}`}>
                        <EditLogo />
                    </LinkButton>
                </Tooltip>
                <Tooltip content="Eliminar">
                    <DefaultButton onClick={() => handleDelete(vehicle)}>
                        <TrashLogo />
                    </DefaultButton>
                </Tooltip>
            </Table.Cell>
        </Table.Row>
    );
}
