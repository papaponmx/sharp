<script lang="ts" context="module">
	import { get } from 'svelte/store';
	import { createMagic, store as authStore } from '$lib/auth';

	import { Magic } from 'magic-sdk';

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
	let userData;

	const getUserData = async (issuer) => {
		try {
			return (
				issuer &&
				fetch('/api/db/user', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${issuer}`
					}
				})
					.then((res) => {
						res.json();
					})
					.then((res) => {
						userData = res;
					})
			);
		} catch {
			// Handle errors if required!
		}
	};

	$: auth = $authStore;
	$: {
		if (auth.user && !userData) {
			getUserData(auth.user.issuer);
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
