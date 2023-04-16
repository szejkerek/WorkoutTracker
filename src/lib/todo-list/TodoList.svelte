<script lang="ts">
    import { tasks, addNewTask } from "../../stores/todoStore";
	import Task from "./Task.svelte";

    let inputTask: String = '';

    const submitTask = () => {
        addNewTask({
            id: Math.trunc(Math.random() * 100),
            content: inputTask,
            completed: false,
            timestamp: Date.now()
        });
    }
</script>

<h1 class='text-4xl py-5 text-blue-500 text-center'>↓ Your silly tasks ↓</h1>
<form on:submit|preventDefault={() => submitTask()} class='flex flex-col mx-auto w-1/2 justify-center py-3'>
    <input id='task' type='text' placeholder='New task' bind:value={inputTask} 
    class='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-blue-500 focus:border-blue-500 block p-2.5' />

    <button type='submit' class='btn btn-primary w-40 mt-3'>Add</button>
</form>
<div>
    {#each $tasks as task}
    <Task taskData={task} />
    {/each}
</div>
