<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import Protected from '$lib/Protected.svelte';
	import { store as authStore } from '$lib/stores/auth';
	import { options } from '$lib/mocks/heatmap-data';
	import { onMount } from 'svelte';
	import LogWorkoutDay from '$lib/components/log-workout-day.svelte';

	let UserProfile;
	let ApexCharts;
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

	onMount(async () => {
		ApexCharts = (await import('apexcharts')).default;
		const chart = new ApexCharts(
			document.querySelector('#workout-frequency-chart-container'),
			options
		);
		chart.render();
	});
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
			<h2 class="mb-4">Hello, {UserProfile.user.name ?? ''}</h2>
		{/await}

		<LogWorkoutDay />

		<div id="workout-frequency-chart-container" class="bg-gray-800 text-gray-200 h-36 w-full " />
	</Protected>
</section>
