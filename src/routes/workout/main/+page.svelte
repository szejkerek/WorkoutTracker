<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import icon_calendar from '$lib/static/icons/calendar-icon.svg';
	import icon_workout from '$lib/static/icons/workout-icon.svg';
	import { userSessionData } from '../../../stores/userSession.js';
	import arrow_left from '$lib/static/icons/arrow-left.svg';
	import arrow_right from '$lib/static/icons/arrow-right.svg';
	import type { DoneExercise } from '../../types.js';
	import DoneExerciseComp from '$lib/workout/DoneExerciseComp.svelte';
	import { detsStore } from '../../../stores/de.js';

	let ready = false;

	onMount(async () => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			const response = await fetch('/api/doneExercises');
			const data: DoneExercise[] = (await response.json()).data;

			$detsStore = data;
			ready = true;
		}
	});

	function parseDate() {
		day = currentDate.getDate();
		month = currentDate.getMonth();
		let parsedDay = day < 10 ? '0' + day : day;
		let parsedMonth = month + 1 < 10 ? '0' + (month + 1) : month + 1;
		parsedDate =
			parsedDay + '/' + parsedMonth + '/' + currentDate.getFullYear();
	}

	function decrementDay() {
		currentDate.setDate(currentDate.getDate() - 1);
		parseDate();
	}

	function incrementDay() {
		currentDate.setDate(currentDate.getDate() + 1);
		parseDate();
	}

	function startNewWorkout() {
		goto('/workout/categories');
	}

	function copyPreviousWorkout() {
		goto('/calendar');
	}

	export let data;

	let todayDate = new Date();
	let currentDate = todayDate;
	let day;
	let month;
	let parsedDate: String;
	parseDate();

	//to-do
	//get done exercises with date = currentDate and user = currently logged in user
	//if any exercises with date = currentDate exist => display them below the date-thingy
	//else display previous workout and buttons enabling the user to start a new workout or to copy a previously done workout
</script>

{#if ready}
	<div
		class="w-full h-full py-10 text-center bg-gray-300 flex flex-col justify-center items-center"
	>
		<div class="w-full h-1/3 flex flex-col justify-center items-center">
			<div class="text-black font-bold text-3xl mb-10">
				<h1>Hello, {$userSessionData?.staticInfo.displayName}!</h1>
			</div>

			<div class="bg-eminence rounded-md p-4 w-60 text-white">
				<p class="font-normal text-xl italic mb-2">"motivational quote"</p>
				<p class="font-bold text-2xl">~gym bro</p>
			</div>

			<div
				class="flex justify-around items-center flex-row w-96 bg-wisteria my-10 rounded-md text-black font-semibold py-2"
			>
				<button on:click={decrementDay}>
					<img src={arrow_left} alt="Previous day icon" class="w-5 h-5" />
				</button>
				<p class="text-xl">{parsedDate}</p>
				<button on:click={incrementDay}>
					<img src={arrow_right} alt="Next day icon" class="w-5 h-5" />
				</button>
			</div>
		</div>
		<h2 class="mb-2 font-bold text-3xl text-black">Current workout</h2>
			
				<div class="flex flex-row w-full justify-center mt-10 px-10 flex-wrap overflow-y-scroll scrollbar-hide h-fit">
					
					{#each $detsStore as ex}
						<div class="w-1/3 px-10 py-5 ">
							<DoneExerciseComp xd={ex} />
						</div>
					{/each}
				</div>
			
	</div>
{/if}
