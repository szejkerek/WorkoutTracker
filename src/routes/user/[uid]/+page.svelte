<script lang="ts">
	import PostComp from '$lib/posts/PostComp.svelte';
	import ProfileDefault from '$lib/static/ProfileDefault.svg';

	export let data;
	let user: User = data.userData;
	let posts: Post[] = data.postsData;
</script>

<div class="flex flex-row justify-center min-h-screen p-10">
	<div class="w-1/6 p-3 border-r-2 border-purple-300">
		[[MENU PLACEHOLDER]]
	</div>
	<div class="w-2/3 p-3 flex flex-col items-center">
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
					<span class="text-3xl font-semibold">
						{user.staticInfo.displayName}
					</span>
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
		<div class="w-full flex flex-col justify-center items-center py-5">
			{#each posts as post}
				<PostComp postData={post} />
			{/each}
		</div>
	</div>
	<div class="w-1/6 p-3 border-l-2 border-purple-300">
		[[BLANK PLACEHOLDER]]
	</div>
</div>
