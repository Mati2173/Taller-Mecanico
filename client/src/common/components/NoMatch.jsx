// Handles cases where data fetching fails or no results match the query.
import PageTitle from './PageTitle';
import { LinkButton } from './Buttons';
import { HomeLogo, EmojiSad } from './ImagesSVG';

export function NoRecords({ children }) {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <EmojiSad />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay registros</h3>
            <p className="text-gray-600 text-center">{children}</p>
        </div>
    );
}

export function NoMatch({ type, id }) {
    const register = { service: 'Servicio', vehicle: 'Vehículo' };
    
    const title = `${register[type]} no encontrado`;
    const description = `Lo sentimos, el ${register[type].toLowerCase()} que estás buscando no existe o ha ocurrido un error.`;
    const subtitle = register[type] === 'Servicio'
        ? `N° del Servicio: ${id}`
        : `Patente del Vehículo: ${id}`;

    return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)] md:h-screen">
            <PageTitle title={title} />
            <div className="text-center px-4">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">{title}</h1>
                <p className="text-2xl font-semibold text-gray-600 mb-8">{subtitle}</p>
                <p className="text-gray-500 mb-8">{description}</p>
                <LinkButton to="/inicio">
                    <HomeLogo />
                    Volver a la página principal
                </LinkButton>
            </div>
        </div>
    );
}
