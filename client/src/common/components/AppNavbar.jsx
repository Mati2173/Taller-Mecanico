import { Link, useLocation } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import { navbarTheme } from '../../utils/customTheme';
import favicon from '../../assets/images/favicon.svg';

const navigation = [
    { name: 'Inicio', link: '/inicio', current: false },
    { name: 'Vehículos', link: '/vehiculos', current: false },
    { name: 'Servicios', link: '/servicios', current: false },
];

export default function AppNavbar() {
    const location = useLocation();

    let navigationLinks = navigation.map((item) => ({
        ...item,
        current: location.pathname === item.link,
    }));

    return (
        <div className="bg-white drop-shadow-md w-full md:fixed md:z-20">
            <Navbar
                fluid
                rounded
                className="max-w-screen-lg mx-auto px-4 lg:px-0"
                theme={navbarTheme}
            >
                <Navbar.Brand as={Link} to="/inicio">
                    <img
                        src={favicon}
                        className="mr-3 h-9"
                        alt="Taller Mecanico Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold drop-shadow-sm">
                        Taller Mecánico
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    {navigationLinks.map((item) => (
                        <Navbar.Link
                            key={item.name}
                            as={Link}
                            to={item.link}
                            active={item.current}
                            className="text-xl"
                        >
                            {item.name}
                        </Navbar.Link>
                    ))}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
