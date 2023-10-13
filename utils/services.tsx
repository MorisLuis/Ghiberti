const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
	url: 'https://ghiberti0.wpcomstaging.com/',
	consumerKey: 'ck_ae1f9363d261cb49ffb1b1dfd84b8ab6219f6912',
	consumerSecret: 'cs_c4b58102f41d2b011c0ab1adb242db28e40d3741',
	version: "wc/v3"
});

export const getProductsData = async () => {

	return await api.get(
		'products'
	);
}

export const getCategories = async () => {

	return await api.get(
		'products/categories?'
	);
}

export const getProductFromCategory = async (category: string) => {

	return await api.get(
		`products/?category=${category}`
	);
}

export const getProductById = async (id: string) => {
	return await api.get(
		`products/${id}`
	);
}