<script>
	import '../app.css';
	import Header from '$lib/header/Header.svelte';
	import { page } from '$app/stores';
</script>

<div class="flex flex-col bg-gray-300">
	{#if $page.route.id !== '/login' && $page.route.id !== '/register'}
		<Header />
	{/if}

	<slot />
</div>
