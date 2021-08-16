import { getUserByEmail } from '$lib/adapters';

import { magic } from '../auth/_magic';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async(req: Request): Promise<any> => {
	try {
  const token = magic.utils.parseAuthorizationHeader(req.headers['authorization']);

	await magic.token.validate(token);
	const {email} = await magic.users.getMetadataByToken(token);


	const userByEmail = await getUserByEmail(email)

		// TODO: Use this to validate token https://magic.link/docs/admin-sdk/node/api-reference#validate


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