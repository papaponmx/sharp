import type { Request, Response } from '@sveltejs/kit';

import { magic } from './_magic';
import { removeSessionCookie } from './_utils';

export async function get(req: Request): Promise<Response> {
	try {
		if (!req.locals.user) {
			return {
				headers: {},
				status: 401,
				body: JSON.stringify({
					error: {
						message: 'Unauthorized'
					}
				})
			};
		}

		const cookie = removeSessionCookie();

		try {
			await magic.users.logoutByIssuer(req.locals.user.issuer);
		} catch (err) {
			console.error('Magic session already expired');
		}

		return {
			status: 200,
			headers: {
				'set-cookie': cookie
			},
			body: JSON.stringify({})
		};
	} catch (err) {
		return {
		headers: {},
			status: 401,
			body: JSON.stringify({
				error: {
					message: 'Unauthorized'
				}
			})
		};
	}
}
