<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { userSessionData } from "../../stores/userSession";
    export let user: User;
    import profileDefault from "../static/ProfileDefault.svg";

    let followedByUser: boolean = false;
    let followedByFoundUser: boolean = false;
    
    onMount(() => {
        if($userSessionData === null)
            return;
        followedByUser = $userSessionData?.followingIds.includes(user.id);
        followedByFoundUser = user.followingIds.includes($userSessionData.id);
    })
</script>

<div class="py-3 flex flex-row border-b border-wisteria mb-5">
    <button class="flex flex-row w-full p-5 rounded-xl button-bg"
            on:click={() => goto(`/user/${user.id}`)}>
        <img src = {profileDefault} alt = "ikonka" width="75" height="75">
        <div class="flex flex-col px-3 justify-start items-start">
            <span class="font-bold text-black">
                {user.staticInfo.displayName}
            </span>
            <span class="font-semibold text-black">
                @{user.username}
            </span>
            <span class="font-semibold text-eminence">
                {#if followedByUser && followedByFoundUser}           
                    You follow each other
                {:else if followedByUser}
                    Following
                {:else if followedByFoundUser}
                    Follows you
                {/if}
            </span>
        </div>
    </button>  
</div>

<style>
    .button-bg:hover {
        background-color: #D8B4E2;
    }
</style>