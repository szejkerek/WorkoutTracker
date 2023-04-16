<script lang="ts">
    import { goto } from "$app/navigation";

    let username: String;

    const login = () => {
        goto(`/user/${username}`);
    }
</script>

<div class='w-full h-full py-40 text-center flex flex-col justify-around items-center bg-gray-300'>
    <div class='w-80 h-80 bg-gray-700 rounded-full'></div>
    <form on:submit|preventDefault={() => login()} class='form-control w-1/4 items-center'>
        <input bind:value={username} type='text' placeholder='Username' class='w-full input input-bordered input-md' />
        <input type='password' placeholder='Password' class='w-full my-2 input input-bordered input-md' />
        <button type='submit' class='btn btn-accent self-start'>Login</button>
    </form>
</div>