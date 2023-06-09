<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { userSessionData } from '../../../stores/userSession.js';
  
    let ready = false;
    
    onMount(() => {
      if ($userSessionData === null) {
        goto('/start');
      } else {
        ready = true;
      }
    });
  
    let profileDataChanged = false;
    let currentDateOfMeasurement: Date;
    let currentBodyFat: number;
    let currentMuscleWeight: number;
    let currentWeight: number;
  
    const saveProfile = async () => {
      // Save the profile data
    };
  
    function cancelEditing() {
      let route = $userSessionData === null ? '/start' : `/user/${$userSessionData.id}`;
      goto(route);
    }
  </script>
  
  {#if ready}
  <form
    on:submit|preventDefault={(_) => saveProfile()}
    class="w-full h-full py-40 text-center bg-gray-300 flex flex-col justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-5xl text-black mb-12">
        Edit body profile
      </h1>
  
      <div class="mb-4">
        <label>
          <p class="text-black">Date of Measurement:</p>
          <input bind:value={currentDateOfMeasurement}
                 type="date" class="input" />
        </label>
      </div>
      <div class="mb-4">
        <label>
          <p class="text-black">Body Fat (%):</p>
          <input bind:value={currentBodyFat}
                 type="number" placeholder="Body Fat (%)" class="input" />
        </label>
      </div>
      <div class="mb-4">
        <label>
          <p class="text-black">Muscle Weight (kg):</p>
          <input bind:value={currentMuscleWeight}
                 type="number" placeholder="Muscle Weight (kg)" class="input" />
        </label>
      </div>
      <div class="mb-4">
        <label>
          <p class="text-black">Weight (kg):</p>
          <input bind:value={currentWeight}
                 type="number" placeholder="Weight (kg)" class="input" />
        </label>
      </div>
    </div>
  
    <div class="flex justify-center">
      <button type="submit" class="text-white shadow-lg font-bold py-2 px-4 rounded bg-purple-500 hover:bg-purple-700">Save</button>
      <button on:click={cancelEditing} class="text-white shadow-lg font-bold py-2 px-4 rounded bg-gray-500 ml-4 hover:bg-gray-700">Cancel</button>
    </div>
  
    <div class="flex justify-center mt-6">
      {#if profileDataChanged}
        <p class="text-black font-semibold">
          Profile saved.
        </p>
      {/if}
    </div>
  
  </form>
  {/if}
  
  <style>
    .input {
      background-color: #391e46;
      width: 100%;
    }
  </style>
  