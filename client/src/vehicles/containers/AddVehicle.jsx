import { useState } from 'react';
import PageTitle from '../../common/components/PageTitle';
import VehicleForm from '../components/VehicleForm';
import { ErrorModal, SuccessModal } from '../../common/components/Modals';
import { LinkButton } from '../../common/components/Buttons';
import { LeftArrowLogo } from '../../common/components/ImagesSVG';

export default function AddVehicle() {
    const [successSubmit, setSuccessSubmit] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [error, setError] = useState(null);

    return (
        <section className="px-4 lg:px-0 py-10 max-w-screen-lg md:mx-auto md:pt-24">
            <PageTitle title="Nuevo Vehículo" />
            <LinkButton className="inline-block max-w-fit mb-8" to="/vehiculos">
                <LeftArrowLogo />
                Volver
            </LinkButton>
            <div className="flex justify-between gap-8 max-w-full">
                <div className="mr-auto place-self-center">
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
                        Agregar Nuevo Vehículo
                    </h1>
                    <p className="max-w-2xl font-light text-gray-500 text-xl">
                        Completa toda la información que tengás acerca del
                        vehículo
                    </p>
                </div>
            </div>

            <VehicleForm
                setSuccessSubmit={setSuccessSubmit}
                setErrorSubmit={setErrorSubmit}
                setError={setError}
            />

            <SuccessModal
                title="Vehículo agregado con éxito"
                description="El nuevo vehículo ha sido almacenado correctamente."
                showModal={successSubmit}
                acceptLink="/vehiculos"
            />

            <ErrorModal
                description={error}
                showModal={errorSubmit}
                setShowModal={setErrorSubmit}
            />
        </section>
    );
}
