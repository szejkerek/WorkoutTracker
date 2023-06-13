<script lang="ts">
	import SideMenuItem from './SideMenuItem.svelte';
	import logo from '$lib/static/Logo.png';
	import homeIcon from '$lib/static/icons/home-icon.svg';
	import { goto } from '$app/navigation';
	import { root } from 'postcss';

	export let pages: {
		name: string;
		route: string;
		icon: string;
	}[];

	export let scuffedWorkaround: boolean;

</script>

<div class="w-1/2 flex flex-col items-start justify-between h-screen pb-16">
	<div>
		<button class="pt-12" class:invisible = {scuffedWorkaround}
				on:click={() => goto("/")}>			
			<img
				src={logo}
				alt="logo"
				class="w-24 h-24 mb-12 -translate-x-1/3"
			/>
		</button>
		<div>
			{#each pages as page}
				<p>
					<SideMenuItem
						name={page.name}
						route={page.route}
						icon={page.icon}
					/>
				</p>
			{/each}
		</div>
	</div>
	<div class:invisible = {scuffedWorkaround}>
		<SideMenuItem name="Logout" route="/logout" icon={homeIcon} />
	</div>
</div>