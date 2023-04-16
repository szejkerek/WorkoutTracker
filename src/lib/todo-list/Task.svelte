<script lang="ts">
	import { removeTask, toggleCompleted } from "../../stores/todoStore";

    export let taskData: TodoTask;
</script>

<div class='flex flex-row my-2 mx-auto w-1/2 border-2 border-gray-700 rounded-md'>
    <div class='text-purple-800 w-1/12 text-center p-2 border-r border-gray-700'>#{taskData.id}</div>
    <div class={`text-blue-600 w-9/12 p-2 border-r border-gray-700 ${!taskData.completed ? '' : 'line-through'}`}>{taskData.content}</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => toggleCompleted(taskData.id)} class={`text-blue-600 w-1/12 p-2 ${taskData.completed ? 'bg-green-500' : 'bg-red-500'} hover:cursor-pointer hover:${taskData.completed ? 'bg-red-500' : 'bg-green-500'}`}></div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => removeTask(taskData.id)} class='text-blue-600 w-1/12 p-2 text-center hover:cursor-pointer hover:text-red-600'>Delete</div>
</div>