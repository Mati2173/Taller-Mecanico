import { Modal } from 'flowbite-react';
import { DefaultButton } from '../../common/components/Buttons';

export default function ViewDetailModal({ showModal, setShowModal, title, description }) {
    return (
        <Modal
            show={showModal}
            size="lg"
            popup
            onClose={() => setShowModal(false)}
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center divide-y divide-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 pb-4">
                        {title || 'Sin información'}
                    </h3>
                    <p className="text-sm text-gray-500 overflow-y-auto py-4 whitespace-pre-line">
                        {description || 'Sin información'}
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <DefaultButton onClick={() => setShowModal(false)}>
                            Aceptar
                        </DefaultButton>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
