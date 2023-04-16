<script>
	import '../app.css';
	import Footer from '../components/footer/Footer.svelte';
	import Header from '../components/header/Header.svelte';
</script>

<div class="flex flex-col h-screen">
    <Header />

    <slot />

    <Footer />
</div>