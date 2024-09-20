import { TextInput, Select, Tooltip } from 'flowbite-react';
import { DefaultButton } from '../../common/components/Buttons';
import { SearchLogo } from '../../common/components/ImagesSVG';

const options = {
    number_plate: 'Patente',
    brand: 'Marca',
    model: 'Modelo',
    year: 'Año',
    owner_name: 'Dueño',
};

export default function InputSearchVehicle({ setFilter }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const filter = formData.get('filter');
        const input = formData.get('input');

        if (filter && input) setFilter({ [filter]: input });
        else setFilter({});
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full flex justify-center py-6 gap-2">
                <div className="w-auto">
                    <Select id="filter" name="filter" sizing="base" shadow>
                        {Object.entries(options).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="w-1/2">
                    <TextInput
                        id="input"
                        name="input"
                        type="text"
                        placeholder="Buscar por patente, modelo, marca, año o dueño..."
                        sizing="base"
                        shadow
                    />
                </div>
                <div className="w-auto">
                    <Tooltip content="Buscar">
                        <DefaultButton type="submit">
                            <SearchLogo />
                        </DefaultButton>
                    </Tooltip>
                </div>
            </div>
        </form>
    );
}
