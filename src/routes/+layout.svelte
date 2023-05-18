<script>
	import '../app.css';
	import Header from '$lib/header/Header.svelte';
</script>

<div class="flex flex-col bg-gray-300">
	<Header />

	<slot />
</div>
