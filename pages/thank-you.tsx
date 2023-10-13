import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Layout from '@/components/Layout';


const ThankYouContent = () => {
	const [isSessionFetching, setSessionFetching] = useState(false);
	const [sessionData, setSessionData]: any = useState({});
	const session_id = process.browser ? Router.query.session_id : null;

	useEffect(() => {
		setSessionFetching(true);
		if (process.browser) {
			localStorage.removeItem('woo-next-cart');

			if (session_id) {
				axios.get(`/api/get-stripe-session/?session_id=${session_id}`)
					.then((response) => {
						setSessionData(response?.data ?? {});
						setSessionFetching(false);
					})
					.catch((error) => {
						console.log(error);
						setSessionFetching(false);
					});
			}
		}

	}, [session_id]);

	return (
		<div style={{ minHeight: "90vh", padding: "3em" }}>
			<div >
				{isSessionFetching ? <p>Cargando...</p> : (
					<>
						<h1>Gracias por realizar el pedido.</h1>
						<p>Su pago fue exitoso</p>

						<Link legacyBehavior href="/">
							<a className="button">Seguir comprando</a>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default function ThankYou() {
	return (
		<Layout title="Gracias | Ghiberti">
			<ThankYouContent />
		</Layout>
	);
};

