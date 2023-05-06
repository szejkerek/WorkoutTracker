<script lang="ts">
	import TodoList from '$lib/todo-list/TodoList.svelte';

	export let data: App.PageData;
	let a: Number;
	let b: Number;
	let sum: Number = 0;

	const add = async (x: Number, y: Number) => {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ x, y }),
			headers: {
				'content-type': 'application/json'
			}
		});

		sum = await response.json();
	};
</script>

<div class="flex py-3 flex-grow flex-col align-middle bg-gray-300">
	<h1 class="text-blue-600 text-center text-5xl">
		Examplary todo app {data.value}
	</h1>

	{#if data.cos !== null}
		<h2 class="text-blue-500 text-center text-4xl">
			Secret info: {data.cos}
		</h2>
	{/if}

	<div class="flex flex-row justify-around w-1/2 mx-auto my-5 text-red-400">
		<h3 class="text-lg text-red-500">
			To test requests, enter 2 numbers to add: &nbsp;
		</h3>
		<input
			type="number"
			class="input-secondary input-sm bg-gray-500 text-lg font-bold text-green-400"
			bind:value={a}
		/>
		&nbsp; + &nbsp;
		<input
			type="number"
			class="input-secondary input-sm bg-gray-500 text-lg font-bold text-green-400"
			bind:value={b}
		/>
		&nbsp; = &nbsp;
		<span class="text-lg font-bold text-red-400">{sum}</span>
	</div>

	<button class="btn btn-secondary w-20 mx-auto" on:click={() => add(a, b)}
		>Add</button
	>

	<TodoList />
</div>
