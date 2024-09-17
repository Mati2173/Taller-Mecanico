import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './hocs/Layout';
import Home from './common/containers/Home';
import PageNotFound from './common/containers/NotFound';

import Vehicles from './vehicles/containers/Vehicles';
import AddVehicle from './vehicles/containers/AddVehicle';
import EditVehicle from './vehicles/containers/EditVehicle';
import VehicleServices from './vehicles/containers/VehicleServices';

import Services from './services/containers/Services';
import AddService from './services/containers/AddService';
import EditService from './services/containers/EditService';


export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/inicio" replace />} />
                    <Route path="/inicio" Component={Home} />

                    <Route path="/vehiculos" Component={Vehicles} />
                    <Route path="/vehiculos/nuevo" Component={AddVehicle} />
                    <Route path="/vehiculos/editar/:number_plate" Component={EditVehicle}/>

                    <Route path="/servicios" Component={Services} />
                    <Route path="/servicios/:number_plate" Component={VehicleServices} />
                    <Route path="/servicios/nuevo/:number_plate" Component={AddService} />
                    <Route path="/servicios/editar/:id" Component={EditService} />

                    <Route path="*" Component={PageNotFound} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
