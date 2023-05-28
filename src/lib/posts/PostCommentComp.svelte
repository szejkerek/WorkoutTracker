<script lang="ts">
	import { goto } from '$app/navigation';

	export let commentData: PostComment;
</script>

<div class="flex flex-row justify-between w-full">
	<div class="flex flex-row">
		<div class="font-semibold text-black">
			<button on:click={() => goto(`/user/${commentData.author.id}`)}>
				{commentData.author.staticInfo.displayName}
			</button>
		</div>
		<div class="text-black ml-2">
			{commentData.content}
		</div>
	</div>
	<div class="text-black">
		{commentData.date}
	</div>
</div>
