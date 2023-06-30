import { writable } from "svelte/store";
import type { DoneExercise } from "../routes/types";

const updateExercises = (ex: DoneExercise) => {
    dets.update((xd: DoneExercise[]) => [ex, ...xd]);
}

const dets = writable<DoneExercise[]>([]);

export const detsStore = {
    subscribe: dets.subscribe,
    set: dets.set,
    update: updateExercises
}