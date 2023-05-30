<script lang="ts">
	import PostCommentComp from './PostCommentComp.svelte';

	export let postData: Post;
	let logged: boolean = true;

	let comments: PostComment[] = postData.comments;
	let commentsNumber: number = 3;

	const showMoreComments = () => {
		commentsNumber += 3;
	};

	const postComment = (e) => {
		const formData = new FormData(e.target);

		console.log(formData.get('commentBody'));
	};
</script>

<div class="w-full p-10 flex flex-col">
	<div
		class="w-full flex flex-col justify-center border border-black rounded-lg py-5 px-5 shadow-lg"
	>
		<div class="text-md text-black flex flex-row justify-between mb-1">
			<span>{postData.date}</span>
			<span>{postData.likedByIds.length} likes</span>
		</div>
		<div
			class="font-semibold text-xl text-black flex flex-row justify-between"
		>
			<span>{postData.author.staticInfo.displayName}</span>
		</div>
		<div class="text-xl text-black">
			{postData.content}
		</div>
	</div>
	<div class="mt-5 px-2">
		{#each comments.slice(0, commentsNumber) as comment}
			<PostCommentComp commentData={comment} />
		{/each}
	</div>
	<div class="flex flex-row w-1/2">
		{#if commentsNumber < comments.length}
			<button
				on:click={() => showMoreComments()}
				class="btn btn-secondary w-1/2">Load more</button
			>
		{/if}
	</div>
	{#if logged}
		<form
			on:submit|preventDefault={postComment}
			class="flex flex-row w-full mt-5"
		>
			<textarea
				name="commentBody"
				rows="1"
				placeholder="Add a new comment"
				class="p-3 rounded-md w-full bg-gray-200 border border-gray-600 shadow-md text-gray-700"
			/>
			<button type="submit" class="btn btn-secondary ml-2">Post</button>
		</form>
	{/if}
	<div class="border-b border-gray-400 mt-10 w-1/2 self-center" />
</div>
