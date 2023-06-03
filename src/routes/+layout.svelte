<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import SideMenu from '$lib/side-menu/SideMenu.svelte';

	const routesWithNoSidemenu: (string | null)[] = [
		'/login',
		'/register',
		'/start',
		'/',
		null
	];
</script>

<div class="flex flex-row bg-gray-300 max-h-screen justify-center">
	{#if !routesWithNoSidemenu.includes($page.route.id)}
		<div
			class="w-1/6 border-r border-wisteria flex flex-row justify-center items-center my-10 box-border"
		>
			<SideMenu />
		</div>
	{/if}

	<div class="w-2/3 overflow-y-scroll scrollbar-hide">
		<slot />
	</div>
	{#if !routesWithNoSidemenu.includes($page.route.id)}
		<div
			class="w-1/6 border-l border-wisteria flex flex-row justify-center items-center my-10 box-border"
		/>
	{/if}
</div>
