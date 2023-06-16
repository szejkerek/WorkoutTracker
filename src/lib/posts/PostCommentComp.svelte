
<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Post, PostComment } from '../../routes/types';
	import { userSessionData } from '../../stores/userSession';
	import trashIcon from '$lib/static/icons/trash-icon.svg';
	
	export let postData: Post;
	export let commentData: PostComment;

	let deleted = false;

	const deleteComment = async () => {
		postData.comments = postData.comments.filter(
			com => com !== commentData)

		await fetch(`/api/posts/${postData.id}`, {
			method: 'PATCH',
			body: JSON.stringify(postData)
		});

		deleted = true;
	};

</script>

<div class="flex flex-row justify-between w-full" class:hidden={deleted}>
	<div class="flex flex-col mb-2">
		<div class="flex flex-row items-center font-semibold text-black">
			<button on:click={() => goto(`/user/${commentData.author.id}`)}>
				{commentData.author.staticInfo.displayName}
			</button>
			{#if $userSessionData !== null && $userSessionData.id === commentData.author.id}
					<button
						on:click={() => deleteComment()}
						class="hover:bg-red-500 p-1 ml-3 rounded-md"
					>
						<img
							src={trashIcon}
							alt="Delete"
							width="15"
							height="15"
						/>
					</button>
			{/if}
		</div>
		<div class="text-black ml-2">
			{commentData.content}
		</div>
	</div>
	<div class="text-black">
		{commentData.date}
	</div>
</div>
