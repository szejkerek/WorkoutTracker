<script lang="ts">
	import { userSessionData } from '../../../stores/userSession.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { parseDate } from '../../../utilsxd/dateFormat.js';
	import { ExerciseEnum } from '$lib/enums/exerTypes';
	import plusIcon from '$lib/static/icons/plus-icon.svg';
	import { ResultCodes } from '$lib/enums/errorCodes.js';
	import { detsStore } from '../../../stores/de.js';
	import ExerciseCategory from '$lib/workout/ExerciseCategory.svelte';
	import type { Exercise } from '../../types.js';

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
		.filter((ex) => {
			console.log(ex);
			console.log($userSessionData);
			return ex.category.owner.id === $userSessionData?.id;
		})
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

	let invalidMetricData = false;
	let addedExercise = false;
	async function addExerciseToTraining(
		selectedExercise: Exercise,
		{ distance, reps, time, weight }: any
	) {
		addedExercise = false;
		invalidMetricData =
			distance === 0 && reps === 0 && time === 0 && weight === 0;

		if (invalidMetricData) {
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

		addedExercise = true;
	}
</script>

{#if ready}
	<div class="flex flex-col items-center min-h-screen p-10 w-full mx-auto">
		<div
			class="flex flex-col justify-center items-center w-full mb-10 border-b border-wisteria"
		>
			<div class="flex flex-row justify-center w-full">
				<h1 class="text-5xl text-black flex flex-col justify-center">
					Exercise categories
				</h1>
			</div>
			<div class="flex flex-row justify-around w-full">
				<div
					class="w-full flex flex-row justify-center p-10 items-center"
				>
					<img
						src={plusIcon}
						alt="Start new workout icon"
						class="w-10 h-10 mr-5"
					/>
					<button
						on:click={() => goto('/workout/add-own-category')}
						class="font-semibold py-2 px-4 rounded bg-gray-300 text-black text-lg hover:bg-gray-400"
					>
						Add new category
					</button>
				</div>

				<div
					class="w-full flex flex-row justify-center p-10 items-center"
				>
					<img
						src={plusIcon}
						alt="Start new workout icon"
						class="w-10 h-10 mr-5"
					/>
					<button
						on:click={() => goto('/workout/add-own-exercise')}
						class="font-semibold py-2 px-4 rounded bg-gray-300 text-black text-lg hover:bg-gray-400"
					>
						Add new exercise
					</button>
				</div>
			</div>
		</div>
		<div
			class="w-2/3 p-3 flex flex-col items-center justify-center overflow-y-scroll scrollbar-hide"
		>
			{#each mappedExercises as { category, exercises }}
				<div class="w-full flex flex-col justify-center items-center">
					<ExerciseCategory
						{category}
						{exercises}
						onExerciseAdd={addExerciseToTraining}
					/>
					{#if invalidMetricData}
						<p class="text-red-500 font-semibold">
							Please fill the metrics correctly.
						</p>
					{/if}
					{#if addedExercise}
						<p class="text-black font-semibold">
							Exercise added to current workout.
						</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}
