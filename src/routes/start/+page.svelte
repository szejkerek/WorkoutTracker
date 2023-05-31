<script lang='ts'>
    import { goto } from "$app/navigation";
    import Logo from '$lib/static/Logo.png'

    const loginRedirect = () => {
        console.log('Login...');

        goto('/login');
    };

    const registerRedirect = () => {
        console.log('Register...');

        goto('/register');
    }
</script>

<div class='w-full h-full py-56 text-center flex flex-col justify-around items-center bg-gray-300'>
    <div>
        <img src={Logo} alt="cipa" width=350px height=350px>
    </div>
    <button on:click={() => loginRedirect()} class='btn btn-blue w-40 btn-accent mt-4'>Login</button>
    <button on:click={() => registerRedirect()} class='btn w-40 btn-secondary mt-6' >Register</button>
    <p class='text-primary'>Don't have account yet?</p>
</div>

<style>
    .btn {
      @apply font-bold py-2 px-4 rounded;
    }
    .btn-blue {
      @apply bg-blue-500 text-white;
    }
    .btn-blue:hover {
      @apply bg-blue-700;
    }
</style>