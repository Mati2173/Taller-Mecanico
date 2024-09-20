import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../common/components/PageTitle';
import VehicleForm from '../components/VehicleForm';
import { ErrorModal, SuccessModal } from '../../common/components/Modals';
import { NoMatch } from '../../common/components/NoMatch';
import Loading from '../../common/components/Loading';
import { LinkButton } from '../../common/components/Buttons';
import { LeftArrowLogo } from '../../common/components/ImagesSVG';
import useEditVehicle from '../hooks/useEditVehicle';

export default function EditVehicle() {
    const { number_plate } = useParams();
    const { isLoading, vehicle } = useEditVehicle({ number_plate });

    const [successSubmit, setSuccessSubmit] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [error, setError] = useState(null);

    if (isLoading) return <Loading page />;
    else if (!vehicle) return <NoMatch type='vehicle' id={number_plate} />;

    return (
        <section className="px-4 lg:px-0 py-10 max-w-screen-lg md:mx-auto md:pt-24">
            <PageTitle title={`Editar Vehículo - ${number_plate}`} />
            <LinkButton className="inline-block max-w-fit mb-8" to="/vehiculos">
                <LeftArrowLogo />
                Volver
            </LinkButton>
            <div className="flex justify-between gap-8 max-w-full">
                <div className="mr-auto place-self-center">
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
                        Editar Vehículo
                    </h1>
                    <p className="max-w-2xl font-light text-gray-500 text-xl">
                        Completa toda la información que tengás acerca del
                        vehículo
                    </p>
                </div>
            </div>

            <VehicleForm
                vehicle={vehicle}
                setSuccessSubmit={setSuccessSubmit}
                setErrorSubmit={setErrorSubmit}
                setError={setError}
            />

            <ErrorModal
                description={error}
                showModal={errorSubmit}
                setShowModal={setErrorSubmit}
            />

            <SuccessModal
                title="Vehículo editado con éxito"
                description="Los cambios en el vehículo han sido guardados correctamente."
                showModal={successSubmit}
                acceptLink="/vehiculos"
            />
        </section>
    );
}
