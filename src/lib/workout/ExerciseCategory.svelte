<script lang="ts">
	import type { Exercise } from '../../routes/types';
	import { ExerciseEnum } from '$lib/enums/exerTypes';
	import trashIcon from '$lib/static/icons/trash-icon.svg';

	export let category: UserCategory;
	export let exercises: Exercise[];
	export let onExerciseAdd: Function;

	let deleted = false;
	let showExercises = false;
	let selectedExercise: Exercise | null = null;

	let weight = 0;
	let distance = 0;
	let time = 0;
	let reps = 0;

	const tryToAddExercise = () => {
		if (
			selectedExercise === null ||
			(selectedExercise.exerciseType === ExerciseEnum.Distance &&
				distance === undefined) ||
			(selectedExercise.exerciseType === ExerciseEnum.Reps &&
				reps === undefined) ||
			(selectedExercise.exerciseType === ExerciseEnum.Time &&
				time === undefined) ||
			(selectedExercise.exerciseType === ExerciseEnum.Weight &&
				weight === undefined)
		) {
			return;
		}

		onExerciseAdd(selectedExercise, { distance, weight, time, reps });
	};

	const deleteCategory = async () => {
		return;
		exercises.forEach(
			async (ex) =>
				await fetch('/api/exercises', {
					method: 'DELETE',
					body: JSON.stringify({ uid: ex.id })
				})
		);

		await fetch('/api/exerciseCategories', {
			method: 'DELETE',
			body: JSON.stringify({ uid: category.id })
		});

		deleted = true;
	};

	const deleteExercise = async (exercise: Exercise) => {
		await fetch('/api/exercises', {
			method: 'DELETE',
			body: JSON.stringify({ uid: exercise.id })
		});

		exercises = exercises.filter((ex) => ex.id !== exercise.id);
	};
</script>

<div
	class="flex flex-col border-2 border-eminence w-1/2 rounded-xl"
	class:hidden={deleted}
	class:my-5={!deleted}
>
	<button
		on:click={() => (showExercises = !showExercises)}
		class={`relative flex flex-col items-center text-center text-black bg-wisteria hover:bg-pink-lavender p-3 font-bold text-2xl rounded-t-xl 
            ${showExercises ? 'border-b border-eminence' : 'rounded-b-xl'}`}
	>
		<button
			on:click|stopPropagation={() => deleteCategory()}
			class="absolute top-0 left-0 translate-x-1/4 translate-y-1/4 hover:bg-red-500 p-2 rounded-md z-50"
		>
			<img src={trashIcon} alt="Delete" width="25" height="25" />
		</button>
		<span>{category.name}</span>
		<span class="font-normal text-xl">
			{category.note.length > 15
				? `${category.note.substring(0, 15).trim()}...`
				: category.note}
		</span>
	</button>
	{#if showExercises}
		<div class="flex flex-col bg-pink-lavender p-3 rounded-b-xl">
			{#each exercises as exercise}
				<button
					on:click={() => {
						selectedExercise =
							selectedExercise === exercise ? null : exercise;
					}}
					class="relative flex flex-col items-center border-b-2 border-wisteria p-2 text-black text-xl font-semibold hover:border-black"
				>
					<button
						on:click|stopPropagation={() =>
							deleteExercise(exercise)}
						class="absolute top-0 left-0 translate-x-1/4 translate-y-1/4 hover:bg-red-500 p-1 rounded-md z-50"
					>
						<img
							src={trashIcon}
							alt="Delete"
							width="20"
							height="20"
						/>
					</button>
					<span>{exercise.displayName}</span>
					<span class="font-normal text-lg">
						{exercise.note.length > 15
							? `${exercise.note.substring(0, 15).trim()}...`
							: exercise.note}
					</span>
				</button>
				{#if selectedExercise === exercise}
					<div
						class="w-full flex flex-col justify-center items-center py-5"
					>
						{#if exercise.exerciseType & ExerciseEnum.Weight}
							<div class="flex flex-col justify-start">
								<div
									class="font-semibold text-lg text-eminence"
								>
									Weight (kg)
								</div>
								<input
									placeholder="Weight"
									bind:value={weight}
									type="number"
									class="p-2 mb-2 rounded-md"
									min="0"
								/>
							</div>
						{/if}
						{#if exercise.exerciseType & ExerciseEnum.Distance}
							<div class="flex flex-col justify-start">
								<div
									class="font-semibold text-lg text-eminence"
								>
									Distance (m)
								</div>
								<input
									placeholder="Distance"
									bind:value={distance}
									type="number"
									class="p-2 mb-2 rounded-md"
									min="0"
								/>
							</div>
						{/if}
						{#if exercise.exerciseType & ExerciseEnum.Reps}
							<div class="flex flex-col justify-start">
								<div
									class="font-semibold text-lg text-eminence"
								>
									Repetitions
								</div>
								<input
									placeholder="Repetitions"
									bind:value={reps}
									type="number"
									class="p-2 mb-2 rounded-md"
									min="0"
								/>
							</div>
						{/if}
						{#if exercise.exerciseType & ExerciseEnum.Time}
							<div class="flex flex-col justify-start">
								<div
									class="font-semibold text-lg text-eminence"
								>
									Time (s)
								</div>
								<input
									placeholder="Time"
									bind:value={time}
									type="number"
									class="p-2 mb-2 rounded-md"
									min="0"
								/>
							</div>
						{/if}
						<button
							class="bg-purple-500 text-white p-2 rounded-md"
							on:click={() => tryToAddExercise()}
						>
							Add Exercise
						</button>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>
