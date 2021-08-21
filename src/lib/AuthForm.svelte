<script lang="ts">
	import * as auth from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let submitting = false;

	async function login() {
		try {
			submitting = true;
			await auth.login(email);
			goto('/');
		} catch (err) {
			submitting = false;
			console.error('Error submitting auth form', err);
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div
	class="bg-gray-800 h-screen	w-full
	flex flex-col justify-center items-center text-gray-100
"
>
	<form on:submit|preventDefault={login}>
		<label class="flex flex-col gap-4 mb6" for="email"
			>Email
			<input
				class="rounded text-blue-800 p-2 mb-6  focus:border-blue-600 focus:border-8 focus:bg-blue-800 focus:text-gray-100"
				id="email"
				bind:value={email}
			/>
		</label>
		<div class="btn-container">
			<button class="rounded bg-gradient-to-r from-blue-700 to-blue-900 p-4" type="submit"
				>Login / Signup</button
			>
		</div>
	</form>
</div>
