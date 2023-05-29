<script lang="ts">
	import ApiList from '$lib/api-list/ApiList.svelte';
</script>

<div class="flex flex-row w-full">
	<div class="w-1/4">
		<ApiList />
	</div>

	<div class="w-full">
		<slot />
	</div>
</div>
