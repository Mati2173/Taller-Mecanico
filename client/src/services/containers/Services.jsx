import PageTitle from '../../common/components/PageTitle';
import ServicesTable from '../components/ServicesTable';
import useServices from '../hooks/useServices';

export default function Services() {
    const { services, isLoading } = useServices();

    return (
        <section className="px-4 lg:px-0 py-10 max-w-screen-lg md:mx-auto md:pt-24">
            <PageTitle title="Servicios" />
            <div className="flex justify-between gap-8 max-w-full pb-6">
                <div className="mr-auto place-self-center">
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
                        Gestión de Servicios
                    </h1>
                    <p className="max-w-2xl font-light text-gray-500 text-xl">
                        Acá se puede ver todos los servicios realizados y sus
                        detalles
                    </p>
                </div>
            </div>
            
            <ServicesTable services={services} isLoading={isLoading} />
        </section>
    );
}
