import AppNavbar from '../common/components/AppNavbar';

export default function Layout(props) {
    return (
        <>
            <AppNavbar />
            {props.children}
        </>
    );
}
