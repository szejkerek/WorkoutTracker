<script lang="ts">
	let categories: string[] = [
		'Harassment or bullying',
		'Hate speech or discriminatory language',
		'Threats or intimidation',
		'Spam or unwanted commercial content',
		'Impersonation or identity theft',
		'Inappropriate or explicit content',
		'Violent or graphic content',
		'Scam or fraud',
		'Privacy violation',
		'Other'
	];

	let invalidTopic = false;
	let invalidCategory = false;
	let invalidContent = false;
	let submitComplete = false;

	const submitReport = (event: any) => {
		submitComplete = false;

		const formData = new FormData(event.target);

		const topic = (formData.get('topic') ?? '').toString();
		const category = (formData.get('category') ?? '').toString();
		const content = (formData.get('content') ?? '').toString();

		invalidTopic = topic.length === 0;
		invalidCategory = !categories.includes(category);
		invalidContent = content.length === 0;

		if (invalidTopic || invalidCategory || invalidContent) {
			return;
		}

		console.log('zajmiemy sie tym ;) :P :DDD');
		submitComplete = true;
		event.target.reset();
	};
</script>

<div class="w-full py-10 flex flex-col justtify-center items-center">
	<h1 class="text-6xl text-bold text-dark-purple">🚩 Submit a report 🚩</h1>
	<form
		on:submit|preventDefault={(event) => submitReport(event)}
		class="form-control my-24 w-1/2"
	>
		<input
			placeholder="Topic"
			name="topic"
			type="text"
			class="p-3 rounded-md w-full bg-gray-200 border border-gray-600 shadow-md text-gray-700"
		/>
		{#if invalidTopic}
			<p class="font-semibold text-red-600">Please fill in the topic.</p>
		{/if}
		<select
			name="category"
			class="p-3 mt-5 rounded-md w-full bg-gray-200 border border-gray-600 shadow-md text-gray-700"
		>
			<option selected>Select category</option>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
		{#if invalidCategory}
			<p class="font-semibold text-red-600">
				Please select proper category.
			</p>
		{/if}
		<textarea
			name="content"
			rows="6"
			class="p-3 mt-5 rounded-md w-full bg-gray-200 border border-gray-600 shadow-md text-gray-700"
			placeholder="Describe your problem"
		/>
		{#if invalidContent}
			<p class="font-semibold text-red-600">
				Please fill in the content.
			</p>
		{/if}
		<button type="submit" class="btn btn-secondary px-10 w-1/6 mt-5">
			Post
		</button>
	</form>
	{#if submitComplete}
		<p class="font-bold text-2xl text-eminence">
			Thanks for submitting a report!
		</p>
	{/if}
</div>
