import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTitle from '../../common/components/PageTitle';
import ServiceForm from '../components/ServiceForm';
import { ErrorModal, SuccessModal } from '../../common/components/Modals';
import { NoMatch } from '../../common/components/NoMatch';
import Loading from '../../common/components/Loading';
import { DefaultButton } from '../../common/components/Buttons';
import { LeftArrowLogo } from '../../common/components/ImagesSVG';
import useEditService from '../hooks/useEditService';

export default function EditService() {
    const { id } = useParams();
    const { isLoading, service } = useEditService({ id });
    
    const [successSubmit, setSuccessSubmit] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    
    if (isLoading) return <Loading page />;
    else if (!service) return <NoMatch type="service" id={id} />;

    return (
        <section className="px-4 lg:px-0 py-10 max-w-screen-lg md:mx-auto md:pt-24">
            <PageTitle title={`Editar Servicio - N° ${id}`} />
            <DefaultButton className="mb-8" onClick={() => navigate(-1)}>
                <LeftArrowLogo />
                Volver
            </DefaultButton>
            <div className="flex justify-between gap-8 max-w-full">
                <div className="mr-auto place-self-center">
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
                        Editar Servicio
                    </h1>
                    <p className="max-w-2xl font-light text-gray-500 text-xl">
                        Completa toda la información que tengás acerca del
                        servicio
                    </p>
                </div>
            </div>

            <ServiceForm
                service={service}
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
                title="Servicio editado con éxito"
                description="Los cambios en el servicio han sido guardados correctamente."
                showModal={successSubmit}
            />
        </section>
    );
}
