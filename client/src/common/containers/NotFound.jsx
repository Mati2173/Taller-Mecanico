import PageTitle from '../components/PageTitle';
import { LinkButton } from '../components/Buttons';
import { HomeLogo } from '../components/ImagesSVG';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)] md:h-screen">
            <PageTitle title="Error 404" />
            <div className="text-center px-4">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl font-semibold text-gray-600 mb-8">
                    Página no encontrada
                </p>
                <p className="text-gray-500 mb-8">
                    Lo sentimos, la página que estás buscando no existe o ha
                    sido movida.
                </p>
                <LinkButton to="/inicio">
                    <HomeLogo />
                    Volver a la página principal
                </LinkButton>
            </div>
        </div>
    );
}
