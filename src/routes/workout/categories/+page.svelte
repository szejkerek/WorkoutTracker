<script lang="ts">
	import { userSessionData } from '../../../stores/userSession.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { parseDate } from '../../../utilsxd/dateFormat.js';
	import { ExerciseEnum } from '$lib/enums/exerTypes';
	import plusIcon from '$lib/static/icons/plus-icon.svg';
	import { ResultCodes } from '$lib/enums/errorCodes.js';
	import { detsStore } from '../../../stores/de.js';

	let ready = false;

	onMount(() => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			ready = true;
		}
	});

	export let data;

	let incCategories: UserCategory[] = data.categoriesData;
	let incExercises: Exercise[] = data.exercisesData;
	let exercisesOfCat: Map<String, Exercise[]> = new Map<String, Exercise[]>();

	incExercises
		// .filter((ex) => ex.category.owner.id === $userSessionData?.id)
		.forEach((ex) => {
			if (exercisesOfCat.get(ex.category.id) === undefined) {
				exercisesOfCat.set(ex.category.id, []);
			}

			exercisesOfCat.get(ex.category.id)?.push(ex);
		});

	const mappedExercises = Array.from(exercisesOfCat).map(
		([categoryId, exercises]) => ({
			category: incCategories.find(
				(cat) => cat.id === categoryId
			) as UserCategory,
			exercises
		})
	);

	let selectedCategory: UserCategory | null = null;
	let selectedExercise: Exercise | null = null;
	let distance: number = 0;
	let reps: number = 0;
	let time: number = 0;
	let weight: number = 0;

	function selectCategory(category: UserCategory) {
		selectedCategory = selectedCategory === category ? null : category;
		selectedExercise = null;
	}

	function selectExercise(exercise: Exercise) {
		selectedExercise = selectedExercise === exercise ? null : exercise;
	}

	async function addExericseToTraining() {
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
			//cos tam wpysozzz
			return;
		}

		const newExercise: DoneExercise = {
			date: parseDate(),
			distanceInMeters: distance,
			exercise: selectedExercise,
			id: '',
			owner: $userSessionData as User,
			repetitions: reps,
			timeInSeconds: time,
			weightInKG: weight
		};

		const response = await fetch('/api/doneExercises', {
			method: 'POST',
			body: JSON.stringify(newExercise)
		});
		const results = await response.json();

		if (results.code === ResultCodes.SUCCESS) {
			detsStore.update(newExercise);
		}

		distance = 0;
		reps = 0;
		time = 0;
		weight = 0;
	}
</script>

{#if ready}
	<div class="flex flex-col items-center min-h-screen p-10 w-full mx-auto">
		<div class="flex flex-row justify-between w-full mb-10">
			<div class="w-1/3 flex flex-row justify-center p-10 items-center">
				<img
					src={plusIcon}
					alt="Start new workout icon"
					class="w-10 h-10 mr-5"
				/>
				<button
					on:click={() => goto('/dodajnowecosrałt')}
					class="font-semibold py-2 px-4 rounded bg-gray-300 text-black text-lg hover:bg-gray-400"
				>
					Add new category
				</button>
			</div>
			<div class="flex flex-row justify-center w-1/3">
				<h1 class="text-5xl text-black flex flex-col justify-center">
					Exercise categories
				</h1>
			</div>
			<div class="w-1/3 flex flex-row justify-center p-10 items-center">
				<img
					src={plusIcon}
					alt="Start new workout icon"
					class="w-10 h-10 mr-5"
				/>
				<button
					on:click={() => goto('/dodajnowecosrałt')}
					class="font-semibold py-2 px-4 rounded bg-gray-300 text-black text-lg hover:bg-gray-400"
				>
					Add new exercise
				</button>
			</div>
		</div>
		<div class="w-2/3 p-3 flex flex-col items-center">
			{#each mappedExercises as { category, exercises }}
				<button
					class="p-2 my-2 rounded cursor-pointer text-black font-semibold text-2xl"
					class:selected={selectedCategory === category}
					on:click={() => selectCategory(category)}
				>
					{category.name}
				</button>
				{#if selectedCategory === category}
					<div
						class="w-1/2 flex flex-col justify-center items-center py-5"
					>
						{#each exercises as exercise}
							<button
								class="p-2 my-2 rounded cursor-pointer text-black font-serif text-xl"
								class:font-semibold={selectedExercise ===
									exercise}
								on:click={() => selectExercise(exercise)}
							>
								{exercise.displayName}
							</button>

							{#if selectedExercise && selectedExercise === exercise}
								<div
									class="w-full flex flex-col justify-center items-center py-5"
								>
									{#if exercise.exerciseType & ExerciseEnum.Weight}
										<div
											class="flex flex-col justify-start"
										>
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
										<div
											class="flex flex-col justify-start"
										>
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
										<div
											class="flex flex-col justify-start"
										>
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
										<div
											class="flex flex-col justify-start"
										>
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
										on:click={() => addExericseToTraining()}
										>Add Exercise</button
									>
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			{/each}
		</div>
		<div class="w-1/6 p-3 border-l-2 border-purple-300" />
	</div>
{/if}
