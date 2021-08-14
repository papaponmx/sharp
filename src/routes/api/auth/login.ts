import type { Request, Response } from '@sveltejs/kit';

import { magic } from './_magic';
import { createSessionCookie } from './_utils';

export async function post(req: Request): Promise<Response> {
	try {
		const didToken = magic.utils.parseAuthorizationHeader(req.headers['authorization']);
		await magic.token.validate(didToken);
		const metadata = await magic.users.getMetadataByToken(didToken);
		const cookie = await createSessionCookie(metadata);

		return {
			status: 200,
			headers: {
				'set-cookie': cookie
			},
			body: JSON.stringify({
				user: metadata
			})
		};
	} catch (err) {
		console.error(err);
		return {
			headers: {},
			status: 500,
			body: JSON.stringify({
				error: {
					message: 'Internal Server Error'
				}
			})
		};
	}
}
