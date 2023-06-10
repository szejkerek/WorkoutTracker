<script lang="ts">
	import Dumbbell from '$lib/static/Dumbbell.svg';
	import { userSessionData } from '../../../stores/userSession.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { parseDate } from '../../../utilsxd/dateFormat.js';

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
	let distance: number;
	let reps: number;
	let time: number;
	let weight: number;

	function selectCategory(category: UserCategory) {
		selectedCategory = selectedCategory === category ? null : category;
		selectedExercise = null;
	}

	function selectExercise(exercise: Exercise) {
		selectedExercise = selectedExercise === exercise ? null : exercise;
	}

	async function addExerciseCategory() {
		if (
			distance === undefined ||
			reps === undefined ||
			time === undefined ||
			weight === undefined ||
			selectedExercise === null
		) {
			//cos tam wpysozzz
			return;
		}

		const today = new Date();
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

		distance = 0;
		reps = 0;
		time = 0;
		weight = 0;
	}
</script>

{#if ready}
	<div class="flex flex-col items-center min-h-screen p-10 w-full mx-auto">
		<div class="flex flex-row justify-between w-1/2 mb-10">
			<h1 class="text-5xl text-black flex flex-col justify-center">
				Exercise categories
			</h1>
			<img src={Dumbbell} alt="dumbbell-icon" width="100" height="100" />
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
									<button
										class="bg-purple-500 text-white p-2 rounded-md"
										on:click={() => addExerciseCategory()}
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
