<script lang="ts">
	import { goto } from '$app/navigation';
	import PostCommentComp from './PostCommentComp.svelte';
	import { userSessionData } from '../../stores/userSession';
	import trashIcon from '$lib/static/icons/trash-icon.svg';
	import heartIcon from '$lib/static/icons/heart-icon.svg';
	import type { Post, PostComment } from '../../routes/types';

	export let postData: Post;
	let commentsNumber: number = 3;
	let commentFormInput: String;
	let deleted = false;

	const showMoreComments = () => {
		commentsNumber += 3;
	};

	const postComment = async (e: any) => {
		const today = new Date();
		const newComment: PostComment = {
			author: $userSessionData as User,
			date: `${today.getDate()}/${
				today.getMonth() + 1
			}/${today.getFullYear()}`,
			content: commentFormInput
		};

		postData.comments = [...postData.comments, newComment];

		await fetch(`/api/posts/${postData.id}`, {
			method: 'PATCH',
			body: JSON.stringify(postData)
		});

		commentFormInput = '';
	};

	const deletePost = async () => {
		await fetch('/api/posts', {
			method: 'DELETE',
			body: JSON.stringify({ uid: postData.id })
		});

		deleted = true;
	};

	const toggleLike = async () => {
		if (postData.likedByIds.includes($userSessionData?.id as String)) {
			postData.likedByIds = postData.likedByIds.filter(
				(id) => id !== $userSessionData?.id
			);
		} else {
			postData.likedByIds = [
				$userSessionData?.id as String,
				...postData.likedByIds
			];
		}

		await fetch(`/api/posts/${postData.id}`, {
			method: 'PATCH',
			body: JSON.stringify(postData)
		});
	};
</script>

<div
	class="w-full mb-5 flex flex-col border-2 border-eminence rounded-lg"
	class:hidden={deleted}
>
	<div
		class="w-full flex flex-col justify-center rounded-t-lg py-5 px-5 shadow-lg bg-wisteria"
	>
		<div
			class="relative text-md text-black flex flex-row justify-between mb-1"
		>
			<div class="flex flex-row items-center">
				<span>{postData.date}</span>
				{#if $userSessionData !== null && $userSessionData.id === postData.author.id}
					<button
						on:click={() => deletePost()}
						class="hover:bg-red-500 p-1 ml-3 rounded-md"
					>
						<img
							src={trashIcon}
							alt="Delete"
							width="20"
							height="20"
						/>
					</button>
				{/if}
			</div>
			<div class="flex flex-row items-center">
				{#if $userSessionData !== null}
					<button
						on:click={() => toggleLike()}
						class="hover:bg-pink-lavender p-1 mr-3 rounded-md"
						class:bg-pink-lavender={postData.likedByIds.includes(
							$userSessionData.id
						)}
					>
						<img
							src={heartIcon}
							alt="Like"
							width="20"
							height="20"
						/>
					</button>
				{/if}
				<span>{postData.likedByIds.length} likes</span>
			</div>
		</div>
		<div
			class="font-semibold text-xl text-black flex flex-row justify-between"
		>
			<button on:click={() => goto(`/user/${postData.author.id}`)}>
				{postData.author.staticInfo.displayName}
			</button>
		</div>
		<div class="text-xl text-black">
			{postData.content}
		</div>
	</div>
	<div class="p-5 bg-pink-lavender border-t-2 border-eminence">
		{#each postData.comments.slice(0, commentsNumber) as comment}
			<PostCommentComp commentData={comment} />
		{/each}
	</div>
	<div class="flex flex-row w-full bg-pink-lavender px-5">
		{#if commentsNumber < postData.comments.length}
			<button
				on:click={() => showMoreComments()}
				class="btn btn-secondary w-1/4">Load more</button
			>
		{/if}
	</div>
	{#if $userSessionData !== null}
		<form
			on:submit|preventDefault={postComment}
			class="flex flex-row w-full bg-pink-lavender p-5 rounded-b-lg"
		>
			<textarea
				bind:value={commentFormInput}
				name="commentBody"
				rows="1"
				placeholder="Add a new comment"
				class="p-3 rounded-md w-full bg-gray-200 border border-gray-600 shadow-md text-gray-700"
			/>
			<button type="submit" class="btn btn-secondary ml-2">Post</button>
		</form>
	{/if}
</div>
