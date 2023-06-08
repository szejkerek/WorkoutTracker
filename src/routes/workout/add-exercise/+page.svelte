<script lang="ts">
  import Dumbbell from '$lib/static/Dumbbell.svg';
  import { userSessionData } from '../../../stores/userSession.js';
  import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

  let ready = false;

	onMount(() => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			ready = true;
		}
	});

	export let data;

  let categories: UserCategory[] = data.categoriesData.filter((category) =>
      category.owner === $userSessionData
  );

  let selectedCategory: UserCategory | null = null;
  let selectedExercise: string | null = null;
  let series: number | null = null;
  let reps: number | null = null;

  function selectCategory(category: UserCategory) {
    selectedCategory = category;
    selectedExercise = null;
  }

  function selectExercise(exercise: string) {
    selectedExercise = exercise;
  }

  function addExerciseCategory() {
    //
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
    <div class="w-2/3 p-3 flex flex-col items-center ">
      {#each categories as category}
        <button
          class="p-2 my-2 rounded cursor-pointer text-black font-semibold text-2xl"
          class:selected="{selectedCategory === category}"
          on:click="{() => selectCategory(category)}"
        >
          {category.name}
        </button>
        {#if selectedCategory === category}
          <div class="w-1/2 flex flex-col justify-center items-center py-5">
            {#each category.name as exercise}
              <button
                class="p-2 my-2 rounded cursor-pointer text-black font-serif text-xl"
                class:selected="{selectedExercise === exercise}"
                on:click="{() => selectExercise(exercise)}"
              >
                {exercise}
              </button>
            {/each}
            {#if selectedExercise}
              <div class="w-full flex flex-col justify-center items-center py-5">
                <h2 class="font-bold text-2xl mb-2 text-black">{selectedExercise}</h2>
                <input placeholder="Series" bind:value="{series}" type="number" class="p-2 mb-2 rounded-md" min="0" />
                <input placeholder="Reps" bind:value="{reps}" type="number" class="p-2 mb-2 rounded-md" min="0" />
                <button class="bg-purple-500 text-white p-2 rounded-md" on:click="{addExercise}">Add Exercise</button>
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
    <div class="w-1/6 p-3 border-l-2 border-purple-300"></div>
  </div>
{/if}
