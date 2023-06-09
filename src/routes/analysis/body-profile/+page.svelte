<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { userSessionData } from '../../../stores/userSession.js';
  import { writable } from 'svelte/store';

  let ready = false;

  onMount(() => {
    if ($userSessionData === null) {
      goto('/start');
    } else {
      ready = true;
    }
  });

  let currentDateOfMeasurement: Date;
  let currentBodyFat: number;
  let currentMuscleWeight: number;
  let currentWeight: number;

  const profiles = writable<{ date: Date; bodyFat: number; muscleWeight: number; weight: number; }[]>([]);

  const saveProfile = async () => {
    const newProfile = {
      date: currentDateOfMeasurement,
      bodyFat: currentBodyFat,
      muscleWeight: currentMuscleWeight,
      weight: currentWeight
    };
    profileAdded=true;
    profiles.update(profilesData => [...profilesData, newProfile]);
  };

  function cancelEditing() {
    let route = $userSessionData === null ? '/start' : `/user/${$userSessionData.id}`;
    goto(route);
  }

  let showHistory = false;
  let profileAdded = false;

  function toggleHistory() {
    showHistory = !showHistory;
    profileAdded = false;
  }
</script>

{#if ready}
  <form
    
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
      <button on:click|preventDefault={(_) => saveProfile()} type="submit" class="text-white shadow-lg font-bold py-2 px-4 rounded bg-purple-500 hover:bg-purple-700">Add</button>
      <button on:click={cancelEditing} class="text-white shadow-lg font-bold py-2 px-4 rounded bg-gray-500 ml-4 hover:bg-gray-700">Cancel</button>
    </div>

    <div class="flex justify-center mt-6">
      {#if profileAdded}
        <p class="text-black font-semibold">
          Profile added.
        </p>
      {/if}
    </div>

    <div class="text-black" style="display: {showHistory ? 'block' : 'none'};">
      <table>
        <thead>
          <tr>
            <th>Date of Measurement</th>
            <th>Body Fat (%)</th>
            <th>Muscle Weight (kg)</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {#each $profiles as profile}
            <tr>
              <td>{profile.date}</td>
              <td>{profile.bodyFat}</td>
              <td>{profile.muscleWeight}</td>
              <td>{profile.weight}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="flex justify-center">
      <button on:click={toggleHistory} class="text-white shadow-lg font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700">
        {showHistory ? 'Hide History' : 'Show History'}
      </button>
    </div>
  </form>


{/if}

<style>
  .input {
    background-color: #391e46;
    width: 100%;
  }
</style>