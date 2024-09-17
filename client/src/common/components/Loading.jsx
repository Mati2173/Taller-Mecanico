import { Spinner } from 'flowbite-react';
import { spinnerTheme } from '../../utils/customTheme';

export default function Loading({ page }) {
    return (
        <div className={`flex flex-col items-center justify-center text-center p-8 ${page ? 'h-screen' : ''}`}>
            <Spinner
                theme={spinnerTheme}
                color="customYellow"
                size="xxl"
                className="mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Cargando...
            </h2>
            <p className="text-gray-600">
                Estamos preparando todo para ti. Esto solo tomará un momento.
            </p>
        </div>
    );
}
