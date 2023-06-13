<script lang="ts">
	import { onMount } from 'svelte';
	import { userSessionData } from '../../stores/userSession';
	import { goto } from '$app/navigation';

	onMount(() => {
		if ($userSessionData !== null) {
			$userSessionData = null;

			goto('/start');
		}
	});
</script>
