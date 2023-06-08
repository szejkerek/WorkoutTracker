<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import SideMenu from '$lib/side-menu/SideMenu.svelte';
	import homeIcon from '$lib/static/icons/home-icon.svg';
	import searchIcon from '$lib/static/icons/search-icon.svg';
	import notificationsIcon from '$lib/static/icons/notifications-icon.svg';
	import profileIcon from '$lib/static/icons/profile-icon.svg';
	import settingsIcon from '$lib/static/icons/settings-icon.svg';
	import reportIcon from '$lib/static/icons/report-icon.svg';
	import bodyIcon from '$lib/static/icons/body-icon.svg';
	import calendarIcon from '$lib/static/icons/calendar-icon.svg';
	import chartIcon from '$lib/static/icons/chart-icon.svg';
	import workoutIcon from '$lib/static/icons/workout-icon.svg';
	import logoutIcon from '$lib/static/icons/logout-icon.svg';
	import { userSessionData } from '../stores/userSession';

	const routesWithNoSidemenu: (string | null)[] = [
		'/login',
		'/register',
		'/start',
		'/',
		null
	];

	let leftPages: {
		name: string;
		route: string;
		icon: string;
	}[] = [
		{
			icon: homeIcon,
			name: 'Home',
			route: '/feed'
		},
		{
			icon: searchIcon,
			name: 'Search',
			route: '/search'
		},
		{
			icon: notificationsIcon,
			name: 'Notifications',
			route: '/feed'
		},
		{
			icon: profileIcon,
			name: 'Profile',
			route:
				$userSessionData === null
					? '/start'
					: `/user/${$userSessionData.id}`
		},
		{
			icon: settingsIcon,
			name: 'Settings',
			route: '/feed'
		},
		{
			icon: reportIcon,
			name: 'Report',
			route: '/report'
		}
	];

	let rightPages: {
		name: string;
		route: string;
		icon: string;
	}[] = [
		{
			icon: workoutIcon,
			name: 'Workout',
			route: '/workout/main'
		},
		{
			icon: bodyIcon,
			name: 'Body',
			route: '/analysis/body-profile'
		},
		{
			icon: calendarIcon,
			name: 'Calendar',
			route: '/calendar'
		},
		{
			icon: chartIcon,
			name: 'Graphs',
			route: '/analysis/graphs'
		}
	];
</script>

<div class="flex flex-row bg-gray-300 max-h-screen justify-center">
	{#if !routesWithNoSidemenu.includes($page.route.id)}
		<div
			class="w-1/6 border-r border-wisteria flex flex-row justify-center items-center my-10 box-border"
		>
			<SideMenu pages={leftPages} scuffedWorkaround={false} />
		</div>
	{/if}

	<div class="w-2/3 overflow-y-scroll scrollbar-hide">
		<slot />
	</div>
	{#if !routesWithNoSidemenu.includes($page.route.id)}
		<div
			class="w-1/6 border-l border-wisteria flex flex-row justify-center items-center my-10 box-border"
		>
			<SideMenu pages={rightPages} scuffedWorkaround={true} />
		</div>
	{/if}
</div>
