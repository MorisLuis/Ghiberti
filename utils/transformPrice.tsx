
const transformPrice = (price_html: any) => {
    // Utilizar una expresión regular para extraer el número en formato de cadena
    const regex = /[\d,]+\.\d{2}/;
    const match = price_html.match(regex);

    const result = parseInt(match[0].replace(/\.\d{2}$/, "").replace(/,/g, ""));

    if (match) {
        return result;
    } else {
        return 'No se pudo analizar el precio';
    }
}

export default transformPrice;