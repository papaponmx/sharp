<script lang="ts" context="module">
	import { get } from 'svelte/store';
	import { store as authStore } from '$lib/auth';

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

<script>
	import Protected from '$lib/Protected.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1 class="text-2xl text-center my-8 uppercase text-white">Sharp</h1>

	<Protected>Protected content</Protected>
</section>
