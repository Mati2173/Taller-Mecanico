export function formatDate(date) {
    const newDate = new Date(`${date}T00:00:00-03:00`);

    return newDate.toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
    });
}

export function formatStringDate(dateString) {
    const months = {
        enero: 0,
        febrero: 1,
        marzo: 2,
        abril: 3,
        mayo: 4,
        junio: 5,
        julio: 6,
        agosto: 7,
        septiembre: 8,
        octubre: 9,
        noviembre: 10,
        diciembre: 11,
    };

    const [day, month, year] = dateString.toLowerCase().split(' de ');

    const date = new Date(year, months[month], day);

    const formatedYear = date.getFullYear();
    const formatedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formatedDay = String(date.getDate()).padStart(2, '0');

    return `${formatedYear}-${formatedMonth}-${formatedDay}`;
}

export function formatVehicleInfo(brand, model, year) {
    if (!brand && !model && !year) return 'Sin información';

    const infoArray = [brand || 'N/A', model || 'N/A', year || 'N/A'];

    return infoArray.join(' - ');
}
