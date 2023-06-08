<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import icon_calendar from "$lib/static/icons/calendar-icon.svg";
    import icon_workout from "$lib/static/icons/workout-icon.svg";
    import { userSessionData } from '../../stores/userSession.js';
  
    let ready = false;
  
	onMount(() => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			ready = true;
		}
	});

    let todayDate = new Date();
    let day = todayDate.getDate() < 10 ? "0" + todayDate.getDate() : todayDate.getDate();
    let month = todayDate.getMonth() + 1  < 10 ? "0" + (todayDate.getMonth() + 1) : todayDate.getMonth() + 1;
    let parsedDate = day + "." + month + "." + todayDate.getFullYear();

  
    function startNewWorkout() {
        goto("/workout-categories");
    }

    function copyPreviousWorkout() {
        goto("/calendar");
    };
  </script>
{#if ready}
  <div class="w-full h-full py-10 text-center bg-gray-300 flex flex-col justify-center items-center">
   <div class="text-black font-bold text-3xl mb-10">
    <h1>Hello, {$userSessionData?.staticInfo.displayName}!</h1>
   </div>

   <div class="bg-eminence rounded-md p-4 w-60 text-white">
    <p class="font-normal text-xl italic mb-2">
        "motivational quote"
    </p>
    <p class="font-bold text-2xl">
        ~gym bro
    </p>
   </div>

   <div class="flex justify-around items-center flex-row w-96 bg-wisteria my-10 rounded-md text-black font-semibold">
    <button>prev</button>
    <p>{parsedDate}</p>
    <button>next</button>
    </div>

   <div class="flex flex-row items-center">
        <div class="flex flex-col justify-center mt-6 px-10 w-2/3">
            <div class="flex flex-row items-center w-full mb-5">
                <img src={icon_workout} alt="Start new workout icon" class="w-10 h-10 mr-5">
                <button on:click={startNewWorkout} class="font-semibold py-2 px-4 rounded bg-gray-300 text-black text-lg hover:bg-gray-400">
                Start new workout
                </button>
            </div>
            <div class="flex flex-row items-center w-full">
                <img src={icon_calendar} alt="Copy previous workout icon" class="w-10 h-10 mr-5">
                <button on:click={copyPreviousWorkout} class="font-semibold py-2 px-4 rounded bg-gray-300 text-black text-lg hover:bg-gray-400">
                Copy previous workout
                </button>
            </div>
        </div> 

    <div class="flex flex-col justify-center text-black mt-10 px-10 font-bold text-3xl">
        <h2 class="mb-2">Previous workout</h2>
        <div class="rounded-md bg-wisteria font-light text-base py-2 m-2">
            <h3>Dumbbell Curl</h3>
            <ul>
                <li>14 kg | 15 reps</li>
                <li>14 kg | 15 reps</li>
                <li>14 kg | 15 reps</li>
            </ul>
        </div>
        <div class="rounded-md bg-wisteria font-light text-base py-2 m-2">
            <h3>Flat Barbell Bench Press</h3>
            <ul>
                <li>90 kg | 8 reps</li>
                <li>90 kg | 8 reps</li>
                <li>90 kg | 8 reps</li>
            </ul>
        </div>
        <div class="rounded-md bg-wisteria font-light text-base py-2 m-2">
            <h3>Lat Pulldown</h3>
            <ul>
                <li>55 kg | 10 reps</li>
                <li>55 kg | 10 reps</li>
                <li>55 kg | 10 reps</li>
            </ul>
        </div>
   </div>
  </div>
</div>
{/if}
  <style>
    ul {
      @apply list-none;
    }
    h3 {
      @apply text-xl font-medium; 
    }
  </style>
  