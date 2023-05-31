<script>
	import '../app.css';
	import { page } from '$app/stores';
	import SideMenu from '$lib/side-menu/SideMenu.svelte';
</script>

<div class="flex flex-row bg-gray-300 max-h-screen">
	{#if $page.route.id !== '/login' && $page.route.id !== '/register'}
	<div class="w-1/6 border-r border-eminence flex flex-row justify-center items-center my-10 box-border">
		<SideMenu />		
	</div>
	{/if}

	<div class="w-2/3 overflow-y-scroll scrollbar-hide">
		<slot />		
	</div>
	{#if $page.route.id !== '/login' && $page.route.id !== '/register'}
	<div class="w-1/6 border-l border-eminence flex flex-row justify-center items-center my-10 box-border">
	</div>
	{/if}
</div>
