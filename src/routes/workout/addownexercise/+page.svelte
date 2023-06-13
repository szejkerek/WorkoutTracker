<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { userSessionData } from '../../../stores/userSession.js';
    import { writable } from 'svelte/store';
  
    let ready = false;
    let showMessage = false;
  
    onMount(() => {
      if ($userSessionData === null) {
        goto('/start');
      } else {
        ready = true;
      }
    });
  
    let exerciseName = '';
    let exerciseNote = '';
  
    const addExercise = () => {
      if (exerciseName === '') {
        return;
      }
  
  
      exerciseName = '';
      exerciseNote = '';
      showMessage=true;
    };

  </script>
  
  {#if ready}
    <form
      on:submit|preventDefault={(_) => addExercise()}
      class="w-full h-full py-40 text-center bg-gray-300 flex flex-col justify-center items-center">
      <div class="flex flex-col justify-center items-center ">
        <h1 class="text-5xl text-black mb-12">
          Add Exercise
        </h1>
  

        <div class="mb-4">
          <label>
            <p class="text-black">Exercise Name:</p>
            <input
              bind:value={exerciseName}
              type="text"
              placeholder="Exercise Name"
              class="input bg-mrcn-purple"
            />
          </label>
        </div>
  
        <div class="mb-4">
          <label>
            <p class="text-black">Note:</p>
            <textarea
              bind:value={exerciseNote}
              placeholder="Note"
              class="input bg-mrcn-purple"
            ></textarea>
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
      </div>
    </form>
  {/if}
  