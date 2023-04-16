<script>
	import '../app.css';
	import Header from '../components/header/Header.svelte';
</script>

<div class="flex flex-col h-screen bg-gray-300">
    <Header />

    <slot />
</div>