import { getUserByEmail } from '$lib/adapters';

import { magic } from '../auth/_magic'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async(request: { body: string; }): Promise<unknown> => {
	try {
		const body = JSON.parse(request.body);
	const metaData = await magic.users.getMetadataByIssuer(body.issuer);
	const userByEmail = await getUserByEmail(metaData.email)

		return {
			status: 200,
			Headers: {},
			body: JSON.stringify({
				user: userByEmail
			})
		};
	} catch (err) {
		console.error('db/user get error', err);
		return {
		Headers: {},
			status: 500,
			body: JSON.stringify({
				error: {
					message: 'Internal Server Error'
				}
			})
		};
	}
}