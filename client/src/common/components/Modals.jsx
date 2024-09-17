import { useNavigate } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { DefaultButton } from './Buttons';
import { ExclamationLogo, CheckLogo, ErrorLogo } from './ImagesSVG';

export function SuccessModal({ title, description, showModal, acceptLink }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (acceptLink) {
            navigate(acceptLink);
        }
        else {
            navigate(-1);
        }
    };

    return (
        <Modal show={showModal} size="lg" popup onClose={handleNavigate}>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckLogo />
                    </div>
                    <h3 className="mb-5 text-lg font-bold text-gray-800">
                        {title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-500">
                        {description}
                    </p>
                    <div className="flex justify-center gap-4">
                        <DefaultButton onClick={handleNavigate}>
                            Aceptar
                        </DefaultButton>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export function ErrorModal({ description, showModal, setShowModal }) {
    return (
        <Modal show={showModal} size="lg" popup onClose={() => setShowModal(false)}>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <ErrorLogo />
                    </div>
                    <h3 className="mb-5 text-lg font-bold text-gray-800">
                        Lo sentimos, algo salió mal :(
                    </h3>
                    <p className="mb-4 text-sm text-gray-500">
                        {description || "Contactarse con el técnico para analizar el error ocurrido"}
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export function ConfirmDeleteModal({ title, description, showModal, onClose, confirm }) {
    return (
        <Modal show={showModal} size="lg" popup onClose={onClose}>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <ExclamationLogo />
                    </div>
                    <h3 className="mb-5 text-lg font-bold text-gray-800">
                        {title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-500">
                        {description}
                    </p>
                    <div className="flex justify-center gap-4">
                        <DefaultButton color="failure" onClick={confirm}>
                            Sí, estoy seguro
                        </DefaultButton>
                        <DefaultButton onClick={onClose}>
                            No, cancelar
                        </DefaultButton>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
