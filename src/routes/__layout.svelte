<script lang="ts" context="module">
	import { store as authStore } from '$lib/auth';

	export async function load({ fetch }) {
		const res = await fetch('/api/auth/user');
		const { user } = await res.json();
		authStore.set({
			loading: false,
			user
		});
		return {
			status: 200,
			context: {
				user
			}
		};
	}
</script>

<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
</style>
