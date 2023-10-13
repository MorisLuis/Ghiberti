/* import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
	apiVersion: '2023-08-16',
});

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
	const { session_id } = req.query;

	try {
		const session = await stripe.checkout.sessions.retrieve(session_id as string);

		res.status(200).json(session);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
 */

const stripe = require( 'stripe' )( process.env.STRIPE_SECRET_KEY );

module.exports = async ( req, res ) => {
	
	const { session_id } = req.query;
	
	const session = await stripe.checkout.sessions.retrieve( session_id );
	
	res.status( 200 ).json( session );
};
