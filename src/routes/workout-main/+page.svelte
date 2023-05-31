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
    }

    let sampleExercise: Exercise = {
        id: "DyoXbrSe7ghNxon5BbUk",
        category: {
            id: "14JYkBMcU7djAh0SNKd7",
            name: "Łapy",
            note: "bicek",
            owner: user,
        },

        displayName: "cwiczenie na bica",
        exerciseType: 1,
        note: "notka"
    }
    let previousWorkout: DoneExercise[] = [

    ];

    let doneExercises: DoneExercise = {
        id: "id",
        owner: user,
        exercise: sampleExercise,
        date: "31-05-2023",
        distanceInMeters: 0,
        timeInSeconds: 0,
        weightInKG: 15,
        repetitions: 15
    }
  
    function startNewWorkout() {
        goto("/workout-categories");
    }

    function copyPreviousWorkout() {
        goto("/workout-calendar");
    };
  </script>

  <div class="w-full h-full py-10 text-center bg-gray-300 flex flex-col justify-center items-center">
   <div class="text-black font-bold text-3xl mb-10">
    <h1>Hello, {user.username}!</h1>
   </div>

   <div class="bg-gray-400 rounded-md p-4 w-60 text-black">
    <p class="font-normal text-xl italic mb-2">
        "jakis motywujacy cytat o pompowaniu bica i zakładaniu żeliwa na sztane"
    </p>
    <p class="font-bold text-2xl">
        ~stary ronniego colemana
    </p>
   </div>
   <div class="flex justify-between w-96 items-center flex-row my-5 bg-gray-400 rounded-md text-black">
    <button>
      xd
      </button>
       <p>?????????</p>
       <button>
        Next day
        </button>
    

   </div>
   <div class="flex justify-between items-center flex-row">
    <div class="flex flex-col justify-center mt-6 px-10">
        <button on:click={startNewWorkout} class="btn mb-5">
        Start new workout
        </button>
        <button on:click={copyPreviousWorkout} class="btn">
        Copy previous workout
        </button>
    </div>

   {#if previousWorkout.length == 0}
   <div class="flex flex-col justify-center text-black mt-10 px-10 font-bold text-3xl">
    <h2 class="mb-2">Previous workout</h2>
    <div class="rounded-md bg-gray-400 font-light text-base py-2 m-2">
        <h3>Dumbbell Curl</h3>
        <ul>
            <li>14 kg | 15 reps</li>
            <li>14 kg | 15 reps</li>
            <li>14 kg | 15 reps</li>
            <li>14 kg | 15 reps</li>
        </ul>
    </div>
    <div class="rounded-md bg-gray-400 font-light text-base py-2 m-2">
        <h3>Flat Barbell Bench Press</h3>
        <ul>
            <li>90 kg | 8 reps</li>
            <li>90 kg | 8 reps</li>
            <li>90 kg | 8 reps</li>
            <li>90 kg | 8 reps</li>
        </ul>
    </div>
    <div class="rounded-md bg-gray-400 font-light text-base py-2 m-2">
        <h3>Lat Pulldown</h3>
        <ul>
            <li>55 kg | 10 reps</li>
            <li>55 kg | 10 reps</li>
            <li>55 kg | 10 reps</li>
            <li>55 kg | 10 reps</li>
        </ul>
    </div>
   </div>
   {/if}
  </div>
</div>
  
  <style>
    .btn {
      @apply border-0 font-semibold py-2 px-4 rounded bg-gray-300;
      @apply text-black text-lg;
    }
    .btn:hover {
      @apply border-2 bg-gray-400 italic;
    }
    ul {
      @apply list-none;
    }
    h3 {
      @apply text-xl font-medium; 
    }
  </style>
  