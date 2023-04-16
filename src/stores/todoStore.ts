import { writable } from "svelte/store";

export const tasks = writable<TodoTask[]>([]);

export const addNewTask = (task: TodoTask) => {
    tasks.update(currentTasks => [...currentTasks, task]);
}

export const toggleCompleted = (id: Number) => {
    tasks.update(currentTasks => currentTasks.map(task => {
        if(task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    }));
}

export const removeTask = (id: Number) => {
    tasks.update(currentTasks => currentTasks.filter(task => task.id !== id));
}