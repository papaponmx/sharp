import type { Request, Response } from '@sveltejs/kit';

import { createSessionCookie } from './_utils';

export const get = async(req: Request): Promise<Response> => {
	try {
		if (!req.locals.user) {
			return {
				headers: {},
				status: 200,
				body: JSON.stringify({
					user: null
				})
			};
		}

		const user = req.locals.user;

		// Refresh session
		const cookie = await createSessionCookie(user);

		return {
			status: 200,
			headers: {
				'set-cookie': cookie
			},
			body: JSON.stringify({
				user
			})
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			headers: {},
			body: JSON.stringify({
				error: {
					message: 'Internal Server Error'
				}
			})
		};
	}
}
