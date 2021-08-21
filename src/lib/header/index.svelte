<script lang="ts">
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
	import { store as authStore, logout } from '../stores/auth';

	$: auth = $authStore;

	function handleLogout() {
		logout();
	}
</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			{#if auth && auth.user}
				<li class:active={$page.path === '/auth'}>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="javascript:void(0)" on:click|preventDefault={handleLogout}>Logout</a>
				</li>
			{:else}
				<li class:active={$page.path === '/auth'}><a href="/auth">Login</a></li>
			{/if}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
	</div>
</header>
