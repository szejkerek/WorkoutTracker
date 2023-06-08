<script lang="ts">
	import ProfileResult from "$lib/profile-result/ProfileResult.svelte";
	import { onMount } from "svelte";
    import { userSessionData } from "../../stores/userSession";

    let users: User[] = [];
    let filteredUsers: User[] = [];
    onMount(async() => {
        const usersResp = await fetch("/api/users");
        const usersRes: User[] = (await usersResp.json()).data;
        users = usersRes;
    })

    const updateResults = (event: any) => 
    {
        let value = event.target.value;
        if(value.length === 0)
        {
            filteredUsers = [];
            return;
        }
        filteredUsers = users.filter((user) => {
            return user.username.toLowerCase().includes(value.toLowerCase()) 
            || user.staticInfo.displayName.toLowerCase().includes(value.toLowerCase());
        });
    }


</script>

<div class="w-full flex flex-col py-32 items-center">
    <input on:input={(event) => updateResults(event)}
           type="text" 
           class="p-3 rounded-md w-1/2 bg-gray-200 border border-gray-600 shadow-md text-gray-700 mb-20"
           placeholder="Search for users">
    <div class="w-1/2 flex flex-col items-left">
        {#each filteredUsers as user}
            <ProfileResult {user}/>
        {/each}
    </div>
</div>