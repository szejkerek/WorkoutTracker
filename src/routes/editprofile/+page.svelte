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

  function handlePhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        user.staticInfo.avatarPath = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  //back to user profile
  function cancelEditing() {
    goto("/");
  };
</script>

<div class="w-full h-full py-40 text-center bg-gray-300 flex flex-col justify-center items-center">
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-5xl text-black mb-12">
      Edit profile
    </h1>
    <div class="mb-4">
      <label>
        <p>Display Name:</p>
        <input bind:value={user.staticInfo.displayName} type="text" placeholder="Display Name" class="input" on:input={() => changingField = 'display name'} />
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
    <div class="mb-4 flex flex-col justify-center items-center">
      <label>
        <p>Avatar:</p>
        <input type="file" accept="image/*" class="input"  on:change={handlePhotoChange} />
      </label>
      {#if user.staticInfo.avatarPath}
        <img src={user.staticInfo.avatarPath} alt="Profile Photo" class="profile-photo shadow-lg " />
      {/if}
    </div>
  </div>

  <div class="flex justify-center mt-12">
    <button on:click={saveProfile} class="btn btn-purple">
      Save
    </button>
    <button on:click={cancelEditing} class="btn btn-secondary ml-4">
      Cancel
    </button>
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
  .btn-purple {
    @apply bg-purple-500 text-white;
  }
  .btn-purple:hover {
    @apply bg-purple-700;
  }

  .input {
    @apply px-4 py-2 mt-2 rounded-md border-gray-400 shadow-lg;
    background-color: #391e46;
    width: 100%; 
  }

  .frame {
    background-color: #c6c0c8;
    padding: 20px;
    border-radius: 10px;
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
