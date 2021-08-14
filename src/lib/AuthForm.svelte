<script lang="ts">
	import * as auth from '$lib/auth';
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
			console.log(err);
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="content">
	<form on:submit|preventDefault={login}>
		<label for="email">Email</label>
		<input id="email" bind:value={email} />
		<div class="btn-container">
			<button type="submit">Login / Signup</button>
		</div>
	</form>
</div>

<style>
	form {
		width: 28rem;
		margin: auto;
		font-size: 1.5rem;
	}

	label {
		display: block;
		font-weight: bold;
		margin-bottom: 0.25rem;
		color: var(--text-color);
		font-size: 16px;
		line-height: 24px;
	}

	input {
		background: transparent;
		border: 1px solid #f2f0ff;
		box-sizing: border-box;
		height: 2.5rem;
		margin-bottom: 0.75rem;
		padding: 0 0.5rem;
		width: 100%;
		border-radius: 8px;
	}

	button {
		background-color: var(--accent-color);
		border-radius: 4px;
		border: none;
		color: white;
		cursor: pointer;
		font-size: 16px;
		font-weight: bold;
		height: 2.5rem;
		line-height: 24px;
		transition: background-color 0.2s ease-in-out;
		width: 100%;
		text-transform: uppercase;
	}

	button:hover {
		background-color: var(--accent-hover);
	}
</style>
