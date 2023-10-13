export const format = (value: number) => {

    console.log({value})
    // Crear formateador
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatter.format(value); // $2,500.00
};
