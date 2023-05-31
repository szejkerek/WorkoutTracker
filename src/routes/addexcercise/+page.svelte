<script lang="ts">
  let exercises = [
    {
      exercise: 'Push-ups',
      series: 3,
      reps: 20
    },
    {
      exercise: 'Squats',
      series: 4,
      reps: 15
    },
    {
      exercise: 'Plank',
      series: 2,
      reps: 60
    }
  ];

  let newExercise = {
    exercise: '',
    series: 0,
    reps: 0
  };

  function addExercise() {
    if (
      newExercise.exercise &&
      newExercise.series >= 0 &&
      newExercise.reps >= 0 &&
      typeof newExercise.series === 'number' &&
      typeof newExercise.reps === 'number'
    ) {
      exercises = [{ ...newExercise }, ...exercises];
      newExercise = {
        exercise: '',
        series: 0,
        reps: 0
      };
    }
  }
</script>

<div class="flex flex-row justify-center min-h-screen p-10">
  <div class="w-1/6 p-3 border-r-2 border-purple-300"></div>
  <div class="w-2/3 p-3 flex flex-col items-center">
    <div class="w-1/2 flex flex-col justify-center items-center py-5">
      <div class="flex flex-col mb-5">
        <input bind:value="{newExercise.exercise}" placeholder="Exercise" class="p-2 mb-2" />
        <input bind:value="{newExercise.series}" placeholder="Series" type="number" class="p-2 mb-2" min="0" on:input="{() => {if(newExercise.series < 0) newExercise.series = 0;}}" />
        <input bind:value="{newExercise.reps}" placeholder="Reps" type="number" class="p-2 mb-2" min="0" on:input="{() => {if(newExercise.reps < 0) newExercise.reps = 0;}}" />
        <button on:click="{addExercise}" class="bg-purple-500 text-white p-2 rounded">Add Exercise</button>
      </div>
      {#each exercises as exercise}
        <div class="my-2">
          <span class="font-black text-black">{exercise.exercise}</span>
          <span class="text-black">{exercise.series} series, {exercise.reps} reps</span>
        </div>
      {/each}
    </div>
  </div>
  <div class="w-1/6 p-3 border-l-2 border-purple-300"></div>
</div>
