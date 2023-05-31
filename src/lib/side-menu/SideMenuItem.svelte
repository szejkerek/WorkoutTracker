<script lang="ts">
	import { goto } from "$app/navigation";

    export let name: string;
    export let route: string;
    export let icon: string;

    
</script>

<button on:click={() => goto(route)} class="text-xl text-black my-5 flex flex-row items-center font-light">
    <img src={icon} alt="xd" class="mr-5 w-10 h-10">
    {name}
</button>