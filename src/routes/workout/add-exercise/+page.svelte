<script lang="ts">

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
  let muscleParts: { name: string; exercises: string[] }[] = [
    {
      name: 'Arms',
      exercises: ['Bicep Curls', 'Tricep Dips', 'Hammer Curls']
    },
    {
      name: 'Legs',
      exercises: ['Squats', 'Lunges', 'Deadlifts']
    },
    {
      name: 'Back',
      exercises: ['Pull-ups', 'Rows', 'Deadlifts']
    },
    {
      name: 'Chest',
      exercises: ['Dumbbell Press', 'Barbell Press', 'Fly Pec Deck']
    }
  ];

  let selectedMusclePart: { name: string; exercises: string[] } | null = null;
  let selectedExercise: string | null = null;
  let series: number | null = null;
  let reps: number | null = null;

  function selectMusclePart(musclePart: { name: string; exercises: string[] }) {
    selectedMusclePart = musclePart;
    selectedExercise = null;
  }

  function selectExercise(exercise: string) {
    selectedExercise = exercise;
  }

  function addExercise() {
    console.log(selectedExercise, series, reps);
  }
</script>

{#if ready}
  <div class="flex flex-row justify-center min-h-screen p-10">
    <div class="w-1/6 p-3 border-r-2 border-purple-300"></div>
    <div class="w-2/3 p-3 flex flex-col items-center ">
      {#each muscleParts as musclePart}
        <button
          class="p-2 my-2 rounded cursor-pointer text-black font-semibold text-2xl"
          class:selected="{selectedMusclePart === musclePart}"
          on:click="{() => selectMusclePart(musclePart)}"
        >
          {musclePart.name}
        </button>
        {#if selectedMusclePart === musclePart}
          <div class="w-1/2 flex flex-col justify-center items-center py-5">
            {#each musclePart.exercises as exercise}
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
