<script lang="ts">
	import { ExerciseEnum } from '$lib/enums/exerTypes';

	export let xd: DoneExercise;
</script>

<div
	class="flex flex-col justify-center border-2 border-eminence rounded-lg max-w-full w-full mt-5 text-black"
>
	<div class="w-full border-b-2 border-eminence p-2 bg-wisteria rounded-t-lg">
		<div class="font-bold text-2xl">
			{xd.exercise.displayName}
		</div>
		<div class="font-semibold text-md">{xd.exercise.category.name}</div>
	</div>
	<div class="flex flex-col py-2 items-center bg-pink-lavender rounded-b-lg h-36">
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
						<td>{xd.timeInSeconds}s</td>
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
