<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userSessionData } from '../../../stores/userSession.js';
	import type { Exercise } from '../../types.js';
	import { ExerciseEnum } from '$lib/enums/exerTypes.js';
	import { ResultCodes } from '$lib/enums/errorCodes.js';

	let ready = false;
	let showMessage = false;

	onMount(async () => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			const response = await fetch('/api/exerciseCategories');
			const result = await response.json();
			const fetchedCategs: UserCategory[] = result.data;

			availableCategories = fetchedCategs.filter(
				(cat) => cat.owner.id === $userSessionData?.id
			);
			ready = true;
		}
	});

	let availableCategories: UserCategory[] = [];

	let exerciseName = '';
	let exerciseNote = '';
	let exerciseCategory: UserCategory;
	let exerciseMetrics: ExerciseEnum = ExerciseEnum.None;

	const addExercise = async () => {
		showMessage = false;

		if (
			exerciseName === '' ||
			exerciseCategory === undefined ||
			exerciseMetrics === ExerciseEnum.None
		) {
			return;
		}

		const newExercise: Exercise = {
			category: exerciseCategory,
			displayName: exerciseName,
			exerciseType: exerciseMetrics,
			id: '',
			note: exerciseNote
		};

		const response = await fetch('/api/exercises', {
			method: 'POST',
			body: JSON.stringify(newExercise)
		});
		const result = await response.json();

		if (result.code === ResultCodes.SUCCESS) {
			exerciseName = '';
			exerciseNote = '';
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
			<h1 class="text-5xl text-black mb-12">Add new exercise</h1>

			<div class="mb-4 w-full">
				<label>
					<p class="text-black font-semibold text-xl mb-2">
						Exercise name:
					</p>
					<input
						bind:value={exerciseName}
						type="text"
						class="input bg-mrcn-purple w-1/2"
					/>
				</label>
			</div>

			<div class="mb-4 w-full">
				<label>
					<p class="text-black font-semibold text-xl mb-2">
						Category:
					</p>
					<select
						bind:value={exerciseCategory}
						class="input bg-mrcn-purple w-1/2"
					>
						{#each availableCategories as category}
							<option value={category}>
								{category.name}
							</option>
						{/each}
					</select>
				</label>
			</div>

			<p class="text-black font-semibold text-xl mb-2">Metrics</p>
			<div
				class="mb-4 w-full flex flex-row justify-around border-2 border-dark-purple rounded-xl p-5"
			>
				<label class="flex flex-col items-center justify-center w-1/4">
					<span class="text-eminence mb-3">Weight</span>
					<input
						on:change={() =>
							(exerciseMetrics ^= ExerciseEnum.Weight)}
						type="checkbox"
						class="checkbox checkbox-primary"
					/>
				</label>
				<label class="flex flex-col items-center justify-center w-1/4">
					<span class="text-eminence mb-3">Time</span>
					<input
						on:change={() => (exerciseMetrics ^= ExerciseEnum.Time)}
						type="checkbox"
						class="checkbox checkbox-primary"
					/>
				</label>
				<label class="flex flex-col items-center justify-center w-1/4">
					<span class="text-eminence mb-3">Repetitions</span>
					<input
						on:change={() => (exerciseMetrics ^= ExerciseEnum.Reps)}
						type="checkbox"
						class="checkbox checkbox-primary"
					/>
				</label>
				<label class="flex flex-col items-center justify-center w-1/4">
					<span class="text-eminence mb-3">Distance</span>
					<input
						on:change={() =>
							(exerciseMetrics ^= ExerciseEnum.Distance)}
						type="checkbox"
						class="checkbox checkbox-primary"
					/>
				</label>
			</div>

			<div class="mb-4 w-full">
				<label class="w-full">
					<p class="text-black font-semibold text-xl mb-2">Note:</p>
					<textarea
						bind:value={exerciseNote}
						rows="5"
						class="input bg-mrcn-purple p-2 w-full"
					/>
				</label>
			</div>
		</div>

		<div class="mb-4">
			{#if showMessage}
				<p class="text-black font-semibold">Exercise added.</p>
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
