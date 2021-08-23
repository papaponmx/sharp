<script lang="ts">
	import { browser } from '$app/env';

	import { goto } from '$app/navigation';

	import Protected from '$lib/Protected.svelte';
	import { store as authStore } from '$lib/stores/auth';

	let UserProfile;
	const fetchUser = (issuer) =>
		fetch(`/api/db/user`, {
			method: 'POST',
			body: JSON.stringify({
				issuer: issuer
			})
		}).then((res) => {
			return res.json();
		});

	$: auth = $authStore;

	$: {
		if (auth.user) {
			UserProfile = fetchUser(auth.user.issuer);
		}

		if (browser && auth.user === null) {
			goto('/auth');
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section
	class="bg-gray-800 h-screen	w-full
	flex flex-col justify-center items-center text-gray-100
"
>
	<h1 class="text-2xl text-center my-8 uppercase text-white">Sharp</h1>

	<Protected>
		{#await UserProfile then UserProfile}
			<h2>{JSON.stringify(UserProfile, null, 2)}</h2>
			<div>User Profile is not loaded</div>
		{/await}

		<p>You are login, therefore you can see this protected content</p>

		<div id="workout-frequency-chart-container" class="bg-gray-300 h-36 w-full " />
	</Protected>
</section>
