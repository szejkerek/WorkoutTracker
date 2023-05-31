<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let user: User = {
    username: 'nnnnikodem',
    password: '123123123',
    email: 'whatwhatwhat@wp.xd',
    staticInfo: {
      age: 5,
      avatarPath: '',
      gender: 'Male',
      displayName: 'niko',
      heightInCM: 166,
    }
  };

  let changingField: string;
  let genderOptions: string[] = ['Male', 'Female', 'Other'];

  function saveProfile() {
    console.log("Profile saved:", user.username, user.staticInfo.age, user.staticInfo.gender, user.staticInfo.displayName, user.staticInfo.heightInCM);
  }

  //back to user profile
  function cancelEditing() {
    goto("/");
  };
</script>
<div class="w-full h-full py-40 text-center bg-gray-300 flex justify-center items-center">
  <div class="frame w-1/4">
    <div class="flex flex-col justify-center items-center">
      <p class="font-black text-4xl mb-8">
        Edit profile
      </p>
      <div class="mb-4">
        <label>
          <p>Display Name:</p>
          <input bind:value={user.staticInfo.displayName} type="text" placeholder="Display Name" class="input" on:input={() => changingField = 'display name'} />
        </label>
      </div>
      <div class="mb-4">
        <label>
          <p>Username:</p>
          <input bind:value={user.username} type="text" placeholder="Username" class="input" on:input={() => changingField = 'username'} />
        </label>
      </div>   
      <div class="mb-4">
        <label>
          <p>Age:</p>
          <input bind:value={user.staticInfo.age} type="number" placeholder="Age" class="input" on:input={() => changingField = 'age'} />
        </label>
      </div>
      <div class="mb-4">
        <label>
          <p>Height (cm):</p>
          <input bind:value={user.staticInfo.heightInCM} type="number" placeholder="Height (cm)" class="input" on:input={() => changingField = 'height'} />
        </label>
      </div>
      <div class="mb-4">
        <label>
          <p>Gender:</p>
          <select bind:value={user.staticInfo.gender} class="input" on:change={() => changingField = 'gender'}>
            {#each genderOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </label>
      </div>
    </div>

    <div class="flex justify-center mt-6">
      <button on:click={saveProfile} class="btn btn-blue">
        Save
      </button>
      <button on:click={cancelEditing} class="btn btn-secondary ml-4">
        Cancel
      </button>
    </div>
  </div>
</div>

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