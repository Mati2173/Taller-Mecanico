import PageTitle from '../components/PageTitle';
import { Card } from 'flowbite-react';
import { LinkButton } from '../components/Buttons';
import { CarLogo, CogLogo, RightArrowLogo } from '../components/ImagesSVG';
import logoPrincipal from '../../assets/images/LogoPrincipal.png';

export default function Home() {
    return (
        <main className="px-4 lg:px-0 max-w-screen-lg md:mx-auto md:pt-10">
            <PageTitle title="Inicio" />
            <section className="flex justify-between gap-8 py-6">
                <div className="mr-auto place-self-center">
                    <h2 className="mb-4 font-extrabold leading-none tracking-tight max-w-xl text-4xl">
                        Panel de Control
                    </h2>
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
                        Taller Mecánico
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 text-xl">
                        Simplifique la administración de vehículos y servicios
                    </p>
                </div>
                <div className="mt-0">
                    <img src={logoPrincipal} alt="Logo Principal" />
                </div>
            </section>
            <section>
                <h2 className="font-semibold text-gray-700 text-xl">
                    Empiece ahora a optimizar su taller, acceda a las secciones
                    de vehículos y servicios con un solo click.
                </h2>
                <div className="flex justify-between py-6 gap-4">
                    <Card className="max-w-md">
                        <h5 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
                            <CarLogo />
                            Gestión de Vehículos
                        </h5>
                        <p className="font-normal text-gray-700">
                            Ingrese nuevos vehículos o administre vehículos
                            existentes en el sistema
                        </p>
                        <LinkButton className="w-full" to="/vehiculos">
                            <>
                                Ir a Vehículos
                                <RightArrowLogo />
                            </>
                        </LinkButton>
                    </Card>
                    <Card className="max-w-md">
                        <h5 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
                            <CogLogo />
                            Gestión de Servicios
                        </h5>
                        <p className="font-normal text-gray-700">
                            Vea todos los servicios para vehículos ya
                            registrados en el sistema
                        </p>
                        <LinkButton className="w-full" to="/servicios">
                            <>
                                Ir a Servicios
                                <RightArrowLogo />
                            </>
                        </LinkButton>
                    </Card>
                </div>
            </section>
        </main>
    );
}
