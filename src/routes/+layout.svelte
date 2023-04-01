<script>
	import '../app.css';
    import dotenv from 'dotenv';
	import Footer from '../components/footer/Footer.svelte';
	import Header from '../components/header/Header.svelte';
    import firebase from 'firebase/app';
	import { onMount } from 'svelte';
    
    dotenv.config();

    onMount(() => {
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        };

        firebase.initializeApp(firebaseConfig);
    });
</script>

<div class="flex flex-col h-screen">
    <Header />

    <slot />

    <Footer />
</div>