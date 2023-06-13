<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userSessionData } from '../stores/userSession';

	onMount(() => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			goto('/feed');
		}
	});
</script>
