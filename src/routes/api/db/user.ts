

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get: import('@sveltejs/kit').RequestHandler = async({ params })=> {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { slug } = params;

	// const article = await db.get(slug);

		return {
			body: {
				article: {
          title: 'This is my article'
        }
			}
	}
}