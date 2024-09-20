import { TextInput, Label, Select, Card } from 'flowbite-react';
import { DefaultButton } from '../../common/components/Buttons';
import car_brands from '../../assets/car_brands.json';
import { createVehicle, editVehicle } from '../../utils/api';

export default function VehicleForm({ vehicle = null, setSuccessSubmit, setErrorSubmit, setError }) {
    const handleSumbit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const credentials = {
            number_plate: formData.get('number_plate'),
            brand: formData.get('brand'),
            model: formData.get('model'),
            year: parseInt(formData.get('year')),
            owner_name: formData.get('owner_name'),
            owner_phone: formData.get('owner_phone'),
        };

        if (!vehicle) {
            handleCreate(credentials);
        }
        else {
            handleEdit(credentials);
        }
    };

    const handleCreate = async (credentials) => {
        const response = await createVehicle({...credentials});
        
        if (response.created) {
            setSuccessSubmit(true);
        }
        else {
            console.error('Error - Creating Vehicle: ', response.error);
            
            if (response.error?.number_plate[0] === "vehicle with this number plate already exists.")
                setError(`Ya existe un vehículo con la patente proporcionada: ${credentials.number_plate}`);
            else
                setError(null);
            
            setErrorSubmit(true);
        }
    }

    const handleEdit = async (credentials) => {
        Object.keys(credentials).forEach(key => {
            if (credentials[key] === vehicle[key]) {
                delete credentials[key];
            }
        });

        const response = await editVehicle({ ...credentials, number_plate: vehicle.number_plate });

        if (response.edited) {
            setSuccessSubmit(true);
        }
        else {
            console.error('Error - Editing Vehicle: ', response.error);

            if (response.error?.detail === "No Vehicle matches the given query.")
                setError(`Ningún vehículo coincide con la patente proporcionada: ${vehicle.number_plate}`);
            else
                setError(null);
            
            setErrorSubmit(true);
        }
    }
    
    return (
        <Card className="my-8">
            <form
                className="divide-y divide-gray-200"
                onSubmit={(e) => handleSumbit(e)}
            >
                <div className="flex flex-col gap-4 pb-4">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                        Datos del Vehículo
                    </h5>
                    <div className="w-full">
                        <Label
                            htmlFor="number_plate"
                            value="Patente *"
                            className="text-base"
                        />
                        <TextInput
                            className="mt-2"
                            id="number_plate"
                            name="number_plate"
                            type="text"
                            helperText="Por ejemplo 'ABC 123' o 'AB 123 CD'"
                            maxLength={15}
                            required
                            shadow
                            disabled={vehicle ? true : false}
                            defaultValue={vehicle?.number_plate}
                        />
                    </div>
                    <div className="w-full">
                        <Label
                            htmlFor="brand"
                            value="Marca"
                            className="text-base"
                        />
                        <Select
                            className="mt-2"
                            id="brand"
                            name="brand"
                            type="text"
                            helperText="Por ejemplo 'Ford' o 'Toyota' o 'Chevrolet'"
                            maxLength={20}
                            shadow
                            defaultValue={vehicle?.brand}
                        >
                            <option value=""></option>
                            <option value="Otro">Otro</option>
                            {car_brands.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="w-full">
                        <Label
                            htmlFor="model"
                            value="Modelo"
                            className="text-base"
                        />
                        <TextInput
                            className="mt-2"
                            id="model"
                            name="model"
                            type="text"
                            helperText="Por ejemplo 'Mustang', 'Corolla' o 'Camaro'"
                            maxLength={50}
                            shadow
                            defaultValue={vehicle?.model}
                        />
                    </div>
                    <div className="w-full">
                        <Label
                            htmlFor="year"
                            value="Año"
                            className="text-base"
                        />
                        <TextInput
                            className="mt-2"
                            id="year"
                            name="year"
                            type="number"
                            helperText="Por ejemplo: 2012"
                            shadow
                            defaultValue={vehicle?.year}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 py-4">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                        Datos del Cliente
                    </h5>
                    <div className="w-full">
                        <Label
                            htmlFor="owner_name"
                            value="Dueño"
                            className="text-base"
                        />
                        <TextInput
                            className="mt-2"
                            id="owner_name"
                            name="owner_name"
                            type="text"
                            helperText="Nombre completo del dueño del vehículo"
                            maxLength={100}
                            shadow
                            defaultValue={vehicle?.owner_name}
                        />
                    </div>
                    <div className="w-full">
                        <Label
                            htmlFor="owner_phone"
                            value="Teléfono"
                            className="text-base"
                        />
                        <TextInput
                            className="mt-2"
                            id="owner_phone"
                            name="owner_phone"
                            type="number"
                            helperText="Número de teléfono del dueño del vehículo"
                            maxLength={15}
                            shadow
                            defaultValue={vehicle?.owner_phone}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 pt-4">
                    <DefaultButton className="w-full" type="submit">
                        Guardar
                    </DefaultButton>
                </div>
            </form>
        </Card>
    );
}
