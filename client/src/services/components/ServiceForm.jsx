import { TextInput, Label, Datepicker, Textarea, Card } from 'flowbite-react';
import { DefaultButton } from '../../common/components/Buttons';
import { datepickerTheme } from '../../utils/customTheme';
import { formatStringDate } from '../../utils/helpers';
import { createService, editService } from '../../utils/api';

export default function ServiceForm({ number_plate = null, service = null, setSuccessSubmit, setErrorSubmit, setError }) {
    const handleSumbit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const credentials = {
            date: formatStringDate(formData.get('date')),
            kilometer_age: parseInt(formData.get('kilometer_age')),
            title: formData.get('title'),
            description: formData.get('description'),
        };

        if (!service) {
            handleCreate(credentials);
        }
        else {
            handleEdit(credentials);
        }
    };

    const handleCreate = async (credentials) => {
        const response = await createService({ ...credentials, vehicle: number_plate });

        if (response.created) {
            setSuccessSubmit(true);
        }
        else {
            console.error('Error - Creating Service: ', response.error);

            if (response.error?.vehicle[0] === `Invalid pk \"${number_plate}\" - object does not exist.`)
                setError(`No es posible agregar un servicio al vehículo con la patente proporcionada (${number_plate}) porque no existe`);
            else
                setError(null);

            setErrorSubmit(true);
        }
    };

    const handleEdit = async (credentials) => {
        Object.keys(credentials).forEach((key) => {
            if (credentials[key] === service[key]) {
                delete credentials[key];
            }
        });
        
        const response = await editService({ ...credentials, vehicle: service.vehicle, id: service.id });

        if (response.edited) {
            setSuccessSubmit(true);
        }
        else {
            console.error('Error - Editing Service: ', response.error);

            if (response.error?.detail === 'No Service matches the given query.')
                setError(`Ningún servicio coincide con el N° proporcionado: ${service.id}`);
            else
                setError(null);

            setErrorSubmit(true);
        }
    };

    return (
        <Card className="my-8">
            <form
                className="divide-y divide-gray-200"
                onSubmit={(e) => handleSumbit(e)}
            >
                <div className="flex flex-col gap-4 pb-4">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                        Datos del Servicio
                    </h5>
                    {service && (
                        <div className="w-full">
                            <Label
                                htmlFor="id"
                                value="N° del Servicio"
                                className="text-base"
                            />
                            <TextInput
                                className="mt-2"
                                id="id"
                                name="id"
                                type="number"
                                helperText="Identificador del Servicio"
                                shadow
                                disabled
                                defaultValue={service.id}
                            />
                        </div>
                    )}
                    <div className="w-full">
                        <Label
                            htmlFor="vehicle"
                            value="Vehículo"
                            className="text-base"
                        />
                        <TextInput
                            className="mt-2"
                            id="vehicle"
                            name="vehicle"
                            type="text"
                            helperText="Patente del vehículo"
                            shadow
                            disabled
                            defaultValue={number_plate || service?.vehicle}
                        />
                    </div>
                    <div className="w-full">
                        <Label
                            htmlFor="date"
                            value="Fecha"
                            className="text-base"
                        />
                        <Datepicker
                            theme={datepickerTheme}
                            language="es-es"
                            labelTodayButton="Fecha de hoy"
                            showClearButton={false}
                            id="date"
                            name="date"
                            helperText="La fecha en la que se realizó el servicio"
                            required
                            shadow
                            defaultDate={
                                service
                                    ? new Date(`${service.date}T00:00:00-03:00`)
                                    : new Date()
                            }
                        />
                    </div>
                    <div className="w-full">
                        <Label
                            htmlFor="kilometer_age"
                            value="Kilometraje"
                            className="text-base"
                        />
                        <TextInput
                            className="mt-2"
                            id="kilometer_age"
                            name="kilometer_age"
                            type="number"
                            helperText="Por ejemplo: 30000"
                            shadow
                            defaultValue={service?.kilometer_age}
                        />
                    </div>
                    <div className="w-full">
                        <Label
                            htmlFor="title"
                            value="Titulo"
                            className="text-base"
                        />
                        <TextInput
                            className="mt-2"
                            id="title"
                            name="title"
                            type="text"
                            helperText="Por ejemplo: Service integral"
                            shadow
                            defaultValue={service?.title}
                        />
                    </div>
                    <div className="w-full">
                        <Label
                            htmlFor="description"
                            value="Descripción"
                            className="text-base"
                        />
                        <Textarea
                            className="mt-2 resize-none"
                            id="description"
                            name="description"
                            type="text"
                            helperText="Por ejemplo: Cambio bomba de agua..."
                            rows={6}
                            shadow
                            defaultValue={service?.description}
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
