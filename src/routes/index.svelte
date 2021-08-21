<script lang="ts">
	import Protected from '$lib/Protected.svelte';
	import { store as authStore } from '$lib/auth';

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
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1 class="text-2xl text-center my-8 uppercase text-white">Sharp</h1>

	{#await UserProfile then UserProfile}
		<h2>{JSON.stringify(UserProfile, null, 2)}</h2>
		<div>User Profile is not loaded</div>
	{/await}

	<Protected>You are login, therefore you can see this protected content</Protected>
</section>
