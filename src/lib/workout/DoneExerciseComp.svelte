<script lang="ts">
	import { ExerciseEnum } from '$lib/enums/exerTypes';
	import { secondsToTimeFormat } from '../../utilsxd/timeFormat';
	import trashIcon from '$lib/static/icons/trash-icon.svg';
	import { detsStore } from '../../stores/de';
	let deleted = false;

	const deleteDoneExercise = async () => {
		await fetch('/api/doneExercises', {
			method: 'DELETE',
			body: JSON.stringify({ uid: xd.id })
		});

		$detsStore = $detsStore.filter((de) => de.id !== xd.id);

		deleted = true;
	};

	export let xd: DoneExercise;
</script>

<div
	class="flex flex-col justify-center border-2 border-eminence rounded-lg max-w-full w-full mt-5 text-black"
	class:hidden={deleted}
>
	<div
		class="relative w-full border-b-2 border-eminence p-2 bg-wisteria rounded-t-lg"
	>
		<div class="font-bold text-2xl">
			{xd.exercise.displayName}
		</div>
		<button
			on:click={() => deleteDoneExercise()}
			class="absolute top-0 left-0 translate-x-1/4 translate-y-1/4 hover:bg-red-500 p-2 rounded-md z-50"
		>
			<img src={trashIcon} alt="Delete" width="20" height="20" />
		</button>
		<div class="font-semibold text-md">{xd.exercise.category.name}</div>
	</div>
	<div
		class="flex flex-col py-2 items-center bg-pink-lavender rounded-b-lg h-36"
	>
		<table class="table-auto text-left text-lg font-semibold">
			<tbody>
				{#if xd.exercise.exerciseType & ExerciseEnum.Weight}
					<tr>
						<td>Weight:</td>
						<td>{xd.weightInKG}kg</td>
					</tr>
				{/if}
				{#if xd.exercise.exerciseType & ExerciseEnum.Distance}
					<tr>
						<td>Distance:</td>
						<td>{xd.distanceInMeters}m</td>
					</tr>
				{/if}
				{#if xd.exercise.exerciseType & ExerciseEnum.Reps}
					<tr>
						<td>Reps:</td>
						<td>{xd.repetitions}</td>
					</tr>
				{/if}
				{#if xd.exercise.exerciseType & ExerciseEnum.Time}
					<tr>
						<td>Time:</td>
						<td>{secondsToTimeFormat(xd.timeInSeconds)}</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>

<style>
	td {
		@apply px-1;
	}
</style>
