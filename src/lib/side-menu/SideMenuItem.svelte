<script lang="ts">
	import { goto } from "$app/navigation";

    export let name: string;
    export let route: string;
    export let icon: string;

    
</script>

<button on:click={() => goto(route)} class="text-xl text-pink-500 font-semibold my-5 flex flex-row items-center">
    <img src={icon} alt="xd" class="mr-5 w-10 h-10">
    {name}
</button>