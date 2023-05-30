<script lang="ts">
	import PostCommentComp from './PostCommentComp.svelte';

	export let postData: Post;
	let logged: boolean = true;

	let comments: PostComment[] = postData.comments;

	const postComment = (e) => {
		const formData = new FormData(e.target);

		console.log(formData.get('commentBody'));
	};
</script>

<div class="w-1/2 border-b border-black p-10">
	<div
		class="w-full flex flex-col justify-center border border-black rounded-lg py-8 px-5 shadow-lg"
	>
		<div
			class="font-semibold text-xl text-black flex flex-row justify-between"
		>
			<span>{postData.author.staticInfo.displayName}</span>
			<span>{postData.likedByIds.length} likes</span>
		</div>
		<div class="text-xl text-black">
			{postData.content}
		</div>
	</div>
	<div class="mt-5">
		{#each comments as comment}
			<PostCommentComp commentData={comment} />
		{/each}
	</div>
	{#if logged}
		<form
			on:submit|preventDefault={postComment}
			class="flex flex-row w-full mt-5"
		>
			<input
				type="text"
				name="commentBody"
				placeholder="Add a new comment"
				class="p-3 rounded-md w-full bg-gray-200 border border-gray-600 shadow-md text-gray-700"
			/>
			<button type="submit" class="btn btn-secondary ml-2">Post</button>
		</form>
	{/if}
</div>
