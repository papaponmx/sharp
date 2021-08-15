import { getUserByEmail } from '$lib/adapters';

import { magic } from '../auth/_magic';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async(req: Request): Promise<any> => {
	try {
  const issuer = magic.utils.parseAuthorizationHeader(req.headers['authorization']);


	const metadata = await magic.users.getMetadataByIssuer(issuer);

	console.log('WTB', metadata);

	const userByEmail = await getUserByEmail('jaime.rios@hey.com')

		// TODO: Use this to validate token https://magic.link/docs/admin-sdk/node/api-reference#validate

		console.log(userByEmail);

		return {
			status: 200,
			Headers: {},
			body: JSON.stringify({
				user: userByEmail
			})
		};
	} catch (err) {
		console.error(err);
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