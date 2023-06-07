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

  let profileDataChanged = false;
  let currentDisplayName = $userSessionData?.staticInfo.displayName as string;
  let currentAvatarPath  = $userSessionData?.staticInfo.avatarPath as string;
  let currentHeightInCM  = $userSessionData?.staticInfo.heightInCM as number;
  let currentAge         = $userSessionData?.staticInfo.age as number;
  let currentGender      = $userSessionData?.staticInfo.gender as 'Male' | 'Female' | 'Other' | 'Murcin'; 

  let invalidFormData = false;

  let genderOptions: string[] = ['Male', 'Female', 'Other', 'Murcin'];

  const saveProfile = async() => {

    if ($userSessionData === null) {
			return
    }

    invalidFormData =
      currentDisplayName === '' ||
      currentAge <= 0 ||
      currentHeightInCM <= 0;

    if(invalidFormData){
      return;
    }

    const updatedStaticInfo: StaticInfo = {
      displayName: currentDisplayName,
      age: currentAge,
      gender: currentGender,
      heightInCM: currentHeightInCM,
      avatarPath: currentAvatarPath
    };

    $userSessionData.staticInfo = updatedStaticInfo;

    const updatedUserResponse = await fetch(`/api/users/${$userSessionData.id}`, {
      method: 'PATCH',
      body: JSON.stringify($userSessionData)
    });

    profileDataChanged = true;
}

  function handlePhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        currentAvatarPath = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  function cancelEditing() {
    let route = $userSessionData === null
					? '/start'
					: `/user/${$userSessionData.id}`
    goto(route);
  }
</script>

{#if ready}
<form
  on:submit|preventDefault={(_) => saveProfile()}
  class="w-full h-full py-40 text-center bg-gray-300 flex flex-col justify-center items-center">
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-5xl text-black mb-12">
      Edit profile
    </h1>
    <div class="mb-4">
      <label>
        <p>Display Name:</p>
        <input bind:value={currentDisplayName}
               type="text" placeholder="Display Name" class="input"/>
      </label>
    </div>
    <div class="mb-4">
      <label>
        <p>Age:</p>
        <input bind:value={currentAge}
               type="number" placeholder="Age" class="input"/>
      </label>
    </div>
    <div class="mb-4">
      <label>
        <p>Height (cm):</p>
        <input bind:value={currentHeightInCM}
               type="number" placeholder="Height (cm)" class="input"/>
      </label>
    </div>
    <div class="mb-4">
      <label>
        <p>Gender:</p>
        <select bind:value={currentGender}
         class="input">
          {#each genderOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </label>
    </div>
    <div class="mb-4 flex flex-col justify-center items-center">
      <label>
        <p>Avatar:</p>
        <input type="file" accept="image/*" class="input"  on:change={handlePhotoChange} />
      </label>
      {#if currentAvatarPath}
        <img src={currentAvatarPath} alt="Avatar" class="profile-photo border-solid-#fff shadow-lg"/>
      {/if}
    </div>
  </div>
    <div class="flex justify-center">
      <button type="submit" class="btn btn-purple">
        Save
      </button>
      <button on:click={cancelEditing} class="btn btn-secondary ml-4">
        Cancel
      </button>
    </div>
    <div class="flex justify-center mt-6">
			{#if profileDataChanged}
				<p class="font-semibold">
					Profile saved.
				</p>
			{/if}
      </div>
  </form>
{/if}
<style>
  .btn {
    @apply text-white shadow-lg font-bold py-2 px-4 rounded;
  }
  .btn:hover {
    @apply bg-gray-700;
  }
  .btn-purple {
    @apply bg-purple-500;
  }
  .btn-purple:hover {
    @apply bg-purple-700;
  }
  .input {
    @apply px-4 py-2 mt-2 rounded-md border-gray-400 shadow-lg;
    background-color: #391e46;
    width: 100%; 
  }
  p {
    @apply text-black;
  }
  .profile-photo {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-top: 10px;
  }
</style>
