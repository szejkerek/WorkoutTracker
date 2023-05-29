<script lang="ts">
	import { goto } from '$app/navigation';

	export let route: string;
	export let routeName: string;

	const changeRoute = () => {
		goto(route);
	};
</script>

<button on:click={() => changeRoute()} class="text-md px-3 py-1">
	{routeName}
</button>
