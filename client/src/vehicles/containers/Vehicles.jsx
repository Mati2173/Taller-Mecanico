import PageTitle from '../../common/components/PageTitle';
import InputSearchVehicle from '../components/InputSearchVehicle';
import VehiclesTable from '../components/VehiclesTable';
import { LinkButton } from '../../common/components/Buttons';
import useVehicles from '../hooks/useVehicles';

export default function Vehicles() {
    const { isLoading, vehicles, setFilter } = useVehicles();

    return (
        <section className="px-4 lg:px-0 py-10 max-w-screen-lg md:mx-auto md:pt-24">
            <PageTitle title="Vehículos" />
            <div className="flex justify-between gap-8 max-w-full">
                <div className="mr-auto place-self-center">
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
                        Gestión de Vehículos
                    </h1>
                    <p className="max-w-2xl font-light text-gray-500 text-xl">
                        Administrá todos los vehículos guardados o ingresá uno
                        nuevo
                    </p>
                </div>
                <div className="place-self-auto">
                    <LinkButton className="max-w-md" to="/vehiculos/nuevo">
                        Agregar nuevo vehículo
                    </LinkButton>
                </div>
            </div>

            <InputSearchVehicle setFilter={setFilter} />

            <VehiclesTable vehicles={vehicles} isLoading={isLoading} />
        </section>
    );
}
