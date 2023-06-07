<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { userSessionData } from '../../stores/userSession.js';

  let ready = false;
  
	onMount(() => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			ready = true;
		}
	});

	export let data;

  let profileDataChanged = false;
  let currentDisplayName = $userSessionData?.staticInfo.displayName;
  let currentAvatarPath  = $userSessionData?.staticInfo.avatarPath;
  let currentHeightInCM  = $userSessionData?.staticInfo.heightInCM;
  let currentAge         = $userSessionData?.staticInfo.age;
  let currentGender      = $userSessionData?.staticInfo.gender; 

  let changingField: string;
  let genderOptions: string[] = ['Male', 'Female', 'Other', 'Murcin'];

  function saveProfile() {

    const updatedStaticInfo: StaticInfo {
      displayName = currentDisplayName,
      age = currentAge,
      gender = currentGender,
      heightInCM = currentHeightInCM,
      avatarPath = ""
    };

    const updatedUserResponse = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(updatedStaticInfo)
		});

    profileDataChanged = true;
  }

  //back to user profile
  function cancelEditing() {
    let route = $userSessionData === null
					? '/start'
					: `/user/${$userSessionData.id}`
    goto(route);
  };
</script>

{#if ready}
  <div class="w-full h-full py-40 text-center bg-gray-300 flex flex-col justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-5xl text-black mb-12">
          Edit profile
        </h1>
        <div class="mb-4">
          <label>
            <p>Display Name:</p>
            <input bind:value={currentDisplayName}
                   type="text" placeholder="Display Name" class="input"
                   on:input={() => changingField = 'display name'} />
          </label>
        </div>
        <div class="mb-4">
          <label>
            <p>Age:</p>
            <input bind:value={currentAge}
                   type="number" placeholder="Age" class="input"
                   on:input={() => changingField = 'age'} />
          </label>
        </div>
        <div class="mb-4">
          <label>
            <p>Height (cm):</p>
            <input bind:value={currentHeightInCM}
                   type="number" placeholder="Height (cm)" class="input"
                   on:input={() => changingField = 'height'} />
          </label>
        </div>
        <div class="mb-4">
          <label>
            <p>Gender:</p>
            <select bind:value={currentGender}
             class="input" on:change={() => changingField = 'gender'}>
              {#each genderOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </label>
        </div>
      </div>

      <div class="flex justify-center mt-12">
        <button on:click={saveProfile} class="btn btn-blue">
          Save
        </button>
        <button on:click={cancelEditing} class="btn btn-secondary ml-4">
          Cancel
        </button>
      </div>
      <div class="flex justify-center">
        {#if profileDataChanged}
          <p class="text-red-500 font-semibold">
            Successfully edited profile!
          </p>
        {/if}
      </div>
  </div>
{/if}
<style>
  .btn {
    @apply shadow-lg font-bold py-2 px-4 rounded;
    @apply bg-gray-500 text-white;
  }
  .btn:hover {
    @apply bg-gray-700;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
    background-color: #55286F ;
  }
  .btn-blue:hover {
    background-color: #391e46;
  }

  .input {
    @apply px-4 py-2 mt-2 rounded-md border-gray-400  shadow-lg;
    background-color:#391e46;
    width: 100%; /* Dodajemy tę linijkę, aby elementy input miały tę samą szerokość */
    
  }

  .frame {
    background-color: #c6c0c8;
    padding: 20px;
    border-radius: 10px; /*rafał*/
  }

  p {
    @apply text-black;
  }

</style>
