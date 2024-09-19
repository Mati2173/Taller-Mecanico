import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../common/components/PageTitle';
import ServiceForm from '../components/ServiceForm';
import { ErrorModal, SuccessModal } from '../../common/components/Modals';
import { LinkButton } from '../../common/components/Buttons';
import { LeftArrowLogo } from '../../common/components/ImagesSVG';

export default function AddService() {
    const [successSubmit, setSuccessSubmit] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [error, setError] = useState(null);

    const { number_plate } = useParams();

    return (
        <section className="px-4 lg:px-0 py-10 max-w-screen-lg mx-auto md:pt-24">
            <PageTitle title="Nuevo Servicio" />
            <LinkButton className="inline-block max-w-fit mb-8" to={`/servicios/${number_plate}`}>
                <LeftArrowLogo />
                Volver
            </LinkButton>
            <div className="flex justify-between gap-8 max-w-full">
                <div className="mr-auto place-self-center">
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
                        Agregar Nuevo Servicio
                    </h1>
                    <p className="max-w-2xl font-light text-gray-500 text-xl">
                        Completa toda la información que tengás acerca del
                        servicio
                    </p>
                </div>
            </div>

            <ServiceForm
                number_plate={number_plate}
                setSuccessSubmit={setSuccessSubmit}
                setErrorSubmit={setErrorSubmit}
                setError={setError}
            />

            <SuccessModal
                title="Servicio agregado con éxito"
                description="El nuevo servicio ha sido almacenado correctamente."
                showModal={successSubmit}
                acceptLink={`/servicios/${number_plate}`}
            />

            <ErrorModal
                description={error}
                showModal={errorSubmit}
                setShowModal={setErrorSubmit}
            />
        </section>
    );
}
