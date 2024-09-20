import { useParams } from 'react-router-dom';
import PageTitle from '../../common/components/PageTitle';
import { Card } from 'flowbite-react';
import ServicesTable from '../../services/components/ServicesTable';
import Loading from '../../common/components/Loading';
import { LinkButton } from '../../common/components/Buttons';
import { LeftArrowLogo } from '../../common/components/ImagesSVG';
import useVehicleServices from '../hooks/useVehicleServices';

export default function VehicleServices() {
    const { number_plate } = useParams();
    const { vehicle, services, isLoading } = useVehicleServices({ number_plate })

    if (isLoading) return <Loading page />;

    return (
        <section className="px-4 lg:px-0 py-10 max-w-screen-lg md:mx-auto md:pt-24">
            <PageTitle title={`Servicios del Vehículo - ${number_plate}`} />
            <LinkButton className="inline-block max-w-fit mb-8" to="/vehiculos">
                <LeftArrowLogo />
                Volver
            </LinkButton>
            <div className="flex justify-between gap-8 max-w-full">
                <div className="mr-auto place-self-center">
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
                        Servicios del Vehículo
                    </h1>
                    <p className="max-w-2xl font-light text-gray-500 text-xl">
                        Acá se puede ver el historial de los servicios del
                        vehículo y agregar nuevos
                    </p>
                </div>
                <div>
                    <LinkButton className="max-w-md" to={`/servicios/nuevo/${number_plate}`}>
                        Agregar nuevo servicio
                    </LinkButton>
                </div>
            </div>

            <Card className="my-8">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    Información del Vehículo
                </h5>
                <p className="font-normal text-gray-700">
                    <span className="font-semibold">Patente: </span>
                    {vehicle?.number_plate || 'Sin información'} <br />
                    <span className="font-semibold">Marca: </span>
                    {vehicle?.brand || 'Sin información'} <br />
                    <span className="font-semibold">Modelo: </span>
                    {vehicle?.model || 'Sin información'} <br />
                    <span className="font-semibold">Año: </span>
                    {vehicle?.year || 'Sin información'} <br />
                    <span className="font-semibold">Dueño: </span>
                    {vehicle?.owner_name || 'Sin información'} <br />
                    <span className="font-semibold">Teléfono: </span>
                    {vehicle?.owner_phone || 'Sin información'}
                </p>
            </Card>

            <ServicesTable services={services} isLoading={isLoading} />
        </section>
    );
}
