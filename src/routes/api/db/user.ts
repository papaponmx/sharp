import type { RequestHandler } from '@sveltejs/kit'
import { getUserByEmail } from '$lib/db/getUserByEmail'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post: RequestHandler = async(request)=> {

	console.log('🧐', request);

	const userByEmail = await getUserByEmail('jaime.rios@hey.com')

  // TODO: Use this to validate token https://magic.link/docs/admin-sdk/node/api-reference#validate

	console.log(userByEmail);

		return {
			body: JSON.stringify({
				article: {
          title: 'This is my article'
        }
			})
	}
}