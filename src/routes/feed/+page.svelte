<script lang="ts">
	import PostComp from '$lib/posts/PostComp.svelte';
	import Dumbbell from '$lib/static/Dumbbell.svg';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { userSessionData } from '../../stores/userSession.js';

	let ready = false;

	onMount(() => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			ready = true;
		}
	});

	export let data;

	let posts: Post[] = data.postsData;
	let postsNumber: number = 5;

	const showMorePosts = () => {
		postsNumber += 5;
	};

	let postFormInput: String;

	const newPost = async () => {
		const today = new Date();
		const post: Post = {
			author: $userSessionData as User,
			date: `${today.getDate()}/${today.getDay()}/${today.getFullYear()}`,
			content: postFormInput,
			comments: [],
			likedByIds: [],
			id: ''
		};

		await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify(post)
		});
	};
</script>

{#if ready}
	<div class="flex flex-col items-center min-h-screen p-10 w-full mx-auto">
		<div class="flex flex-row justify-between w-1/2 mb-10">
			<h1 class="text-5xl text-black flex flex-col justify-center">
				Hello, {$userSessionData?.staticInfo.displayName}!
			</h1>
			<img src={Dumbbell} alt="dumbbell-icon" width="100" height="100" />
		</div>
		<div class="w-1/2">
			<form
				on:submit|preventDefault={() => newPost()}
				class="flex flex-col w-full mt-5 items-end"
			>
				<textarea
					bind:value={postFormInput}
					name="newPost"
					rows="4"
					class="p-3 mb-5 rounded-md w-full bg-gray-200 border border-gray-600 shadow-md text-gray-700"
					placeholder="How did your training go?"
				/>
				<button type="submit" class="btn btn-secondary px-10">
					Post
				</button>
			</form>
		</div>
		<div class="w-full px-48">
			{#each posts.slice(0, postsNumber) as post}
				<PostComp postData={post} />
			{/each}
		</div>
		<div class="flex flex-row justify-center w-1/2">
			{#if postsNumber < posts.length}
				<button
					on:click={() => showMorePosts()}
					class="btn btn-primary w-1/2">Load more</button
				>
			{:else}
				<p class="text-xl text-primary">No more posts to show...</p>
			{/if}
		</div>
	</div>
{/if}
