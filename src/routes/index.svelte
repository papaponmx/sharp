<script lang="ts" context="module">
	import { get } from 'svelte/store';
	import { createMagic, store as authStore } from '$lib/auth';

	export function load() {
		const { user } = get(authStore);
		if (!user) {
			return {
				status: 302,
				redirect: '/auth'
			};
		}
		return {
			status: 200
		};
	}
</script>

<script lang="ts">
	import Protected from '$lib/Protected.svelte';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { afterUpdate } from 'svelte';

	let userData;

	/** TODO: Refactor all of this logic to read from getSession
	 * See https://kit.svelte.dev/docs#modules-$app-stores
	 **/
	const getUserData = async (token) => {
		try {
			return fetch('/api/db/user', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
				.then((res) => {
					res.json();
				})
				.then((res) => {
					userData = res;
				});
		} catch {
			// Handle errors if required!
		}
	};

	const setToken = (token) =>
		authStore.set({
			token,
			loading: false,
			user: auth.user
		});

	// 1. Valdidate Token in local storage
	const getTokenFromStorage = (): string => {
		if (browser) {
			const token = localStorage.getItem('DID').trim();
			return token ?? '';
		}

		return '';
	};

	// 2. login User

	const generateToken = async () => {
		let didToken: string;
		if (browser && auth) {
			try {
				const magic = await createMagic();
				const tokenInStorage = getTokenFromStorage();
				const isLoggedIn = await magic.user.isLoggedIn();

				console.log(`🧪 didToken`, tokenInStorage);
				if (tokenInStorage) {
					const newToken = await magic.auth.loginWithCredential(tokenInStorage);

					didToken = newToken;
					setToken(didToken);
					return;
				}

				if (isLoggedIn) {
					console.log(`✌🏼 User is loged in`);
					return;
				}
				// const email = dev ? MAGIC_TEST_SUCCESS_EMAIL : auth.user.email;
				const email = auth.user.email;
				didToken = email ? await magic.auth.loginWithMagicLink({ email }) : goto('/auth');

				setToken(didToken);
			} catch (err) {
				console.log(`Error generating token on the client: ${err}`);
			}
		}
	};

	$: auth = $authStore;

	afterUpdate(async () => {
		if (auth.user && !auth.token && !userData) {
			generateToken();
			userData = true;
		}
	});

	$: {
		if (auth.token) {
			getUserData(auth.token);
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1 class="text-2xl text-center my-8 uppercase text-white">Sharp</h1>

	<Protected>Protected content</Protected>
</section>
