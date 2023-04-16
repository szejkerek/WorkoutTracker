<script lang='ts'>
    import { goto } from "$app/navigation";

    const loginRedirect = () => {
        console.log('Login...');

        goto('/login');
    };

    const registerRedirect = () => {
        console.log('Register...');

        goto('/register');
    }
</script>

<div class='w-full h-full py-40 text-center flex flex-col justify-around items-center bg-gray-300'>
    <div class='w-80 h-80 bg-gray-700 rounded-full'></div>
    <button on:click={() => loginRedirect()} class='btn w-40 btn-accent mt-4'>Login</button>
    <button on:click={() => registerRedirect()} class='btn w-40 btn-secondary mt-6'>Register</button>
    <p class='text-primary'>Don't have account yet?</p>
</div>