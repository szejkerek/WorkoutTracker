<script lang="ts">
	import PostComp from '$lib/posts/PostComp.svelte';
	import ProfileDefault from '$lib/static/ProfileDefault.svg';
	import { userSessionData } from '../../../stores/userSession';

	export let data;
	let user: User = data.userData;
	let posts: Post[] = data.postsData;

	const follow = async () => {
		if ($userSessionData === null || $userSessionData.id === user.id) {
			return;
		}

		$userSessionData.followingIds = [
			...$userSessionData.followingIds,
			user.id
		];

		await fetch(`/api/users/${$userSessionData.id}`, {
			method: 'PATCH',
			body: JSON.stringify($userSessionData)
		});
	};

	const unfollow = async () => {
		if ($userSessionData === null || $userSessionData.id === user.id) {
			return;
		}

		$userSessionData.followingIds = $userSessionData.followingIds.filter(
			(id) => id !== user.id
		);

		await fetch(`/api/users/${$userSessionData.id}`, {
			method: 'PATCH',
			body: JSON.stringify($userSessionData)
		});
	};
</script>

<div class="flex flex-row justify-center min-h-screen p-10">
	<div class="w-full p-3 flex flex-col items-center">
		<div class="w-full flex flex-row border-b-2 border-purple-300 pb-10">
			<img
				src={ProfileDefault}
				alt="default-profile-pic"
				width="300"
				height="300"
			/>
			<div
				class="w-full text-2xl text-black ml-10 py-10 flex flex-col justify-around"
			>
				<div class="flex flex-col">
					<div class="flex flex-row justify-between">
						<div class="flex flex-row items-center">
							<span class="text-3xl font-semibold">
								{user.staticInfo.displayName}
							</span>
							{#if $userSessionData && user.followingIds.includes($userSessionData.id)}
								<span class="badge badge-secondary ml-5">
									Follows you
								</span>
							{/if}
						</div>
						{#if $userSessionData && $userSessionData.id !== user.id}
							{#if $userSessionData.followingIds.includes(user.id)}
								<button
									on:click={() => unfollow()}
									class="p-3 text-lg rounded-lg border-2 border-purple-400 bg-purple-300 w-1/6"
								>
									Unfollow
								</button>
							{:else}
								<button
									on:click={() => follow()}
									class="p-3 text-lg rounded-lg border-2 border-purple-500 bg-purple-400 w-1/6"
								>
									Follow
								</button>
							{/if}
						{/if}
					</div>
					<span>{user.staticInfo.gender}</span>
				</div>

				<div class="w-full flex flex-row">
					<div
						class="w-1/5 flex flex-col items-center border border-purple-400 bg-purple-300 rounded-md p-3 shadow-lg"
					>
						<span class="font-semibold">Posts</span>
						<span>{posts.length}</span>
					</div>
					<div
						class="w-1/5 mx-5 flex flex-col items-center border border-purple-400 bg-purple-300 rounded-md p-3 shadow-lg"
					>
						<span class="font-semibold">Following</span>
						<span>{user.followingIds.length}</span>
					</div>
				</div>
			</div>
		</div>
		<div
			class="w-full flex flex-col justify-center items-center py-5 px-24"
		>
			{#each posts as post}
				<PostComp postData={post} />
			{/each}
		</div>
	</div>
</div>
