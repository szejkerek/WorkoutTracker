<script lang="ts">
	import SideMenuItem from './SideMenuItem.svelte';
	import logo from '$lib/static/Logo.png';
	import homeIcon from '$lib/static/icons/home-icon.svg';

	export let pages: {
		name: string;
		route: string;
		icon: string;
	}[];
</script>

<div class="w-1/2 flex flex-col items-start justify-between h-screen pb-16">
	<div>
		<div class="pt-12">
			<img
				src={logo}
				alt="logo"
				class="w-24 h-24 mb-12 -translate-x-1/3"
			/>
		</div>
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
	<div>
		<SideMenuItem name="Logout" route="/logout" icon={homeIcon} />
	</div>
</div>
