<script lang="ts">
	import { page } from '$app/stores';
	import { store as authStore, logout } from '../stores/auth';

	$: auth = $authStore;

	function handleLogout() {
		logout();
	}
</script>

<header>
	<nav>
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
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
	</div>
</header>
