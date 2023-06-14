<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userSessionData } from '../../../stores/userSession.js';
	import { ResultCodes } from '$lib/enums/errorCodes.js';

	let ready = false;
	let showMessage = false;

	onMount(() => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			ready = true;
		}
	});

	let categoryName = '';
	let categoryNote = '';

	const addExercise = async () => {
		if (categoryName === '') {
			return;
		}

		const newCat: UserCategory = {
			id: '',
			name: categoryName,
			note: categoryNote,
			owner: $userSessionData as User
		};

		const response = await fetch('/api/exerciseCategories', {
			method: 'POST',
			body: JSON.stringify(newCat)
		});
		const result = await response.json();

		if (result.code === ResultCodes.SUCCESS) {
			categoryName = '';
			categoryNote = '';
			showMessage = true;
		}
	};

	function goBack() {
		let route = $userSessionData === null ? '/start' : `/workout/main`;
		goto(route);
	}
</script>

{#if ready}
	<form
		on:submit|preventDefault={(_) => addExercise()}
		class="w-full h-full py-40 text-center bg-gray-300 flex flex-col justify-center items-center"
	>
		<div class="flex flex-col justify-center items-center">
			<h1 class="text-5xl text-black mb-12">Add new category</h1>

			<div class="mb-4 w-full">
				<label>
					<p class="text-black font-semibold text-xl mb-2">
						Category Name:
					</p>
					<input
						bind:value={categoryName}
						type="text"
						class="input bg-mrcn-purple w-1/2"
					/>
				</label>
			</div>

			<div class="mb-4 w-full">
				<label class="w-full">
					<p class="text-black font-semibold text-xl mb-2">Note:</p>
					<textarea
						bind:value={categoryNote}
						rows="5"
						class="input bg-mrcn-purple p-2 w-full"
					/>
				</label>
			</div>
		</div>

		<div class="mb-4">
			{#if showMessage}
				<p class="text-black font-semibold">Category added.</p>
			{/if}
		</div>
		<div class="flex justify-center">
			<button
				type="submit"
				class="text-white shadow-lg font-bold py-2 px-4 rounded bg-purple-500
                hover:bg-purple-700"
			>
				Save
			</button>
			<button
				on:click={goBack}
				class="text-white shadow-lg font-bold py-2 px-4 rounded bg-gray-500 ml-4
                hover:bg-gray-700"
			>
				Go Back
			</button>
		</div>
	</form>
{/if}
