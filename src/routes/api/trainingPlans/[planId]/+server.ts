import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const trainingPlanRef = firestore.collection("TrainingPlans").doc(event.params.planId);
    const trainingPlan: any = (await trainingPlanRef.get()).data();

    const authorResp = await event.fetch(`/api/users/${trainingPlan.userId}`, {
        method: 'GET'
    });
    const author = await authorResp.json();

    const exercises = trainingPlan.exerciseIds.map(async (exerId): Promise<Exercise> => {
        const exerciseResp = await event.fetch(`/api/exercises/${exerId}`, {
            method: 'GET'
        });
        const exercise = await exerciseResp.json();

        return {
            category: exercise.data.category,
            displayName: exercise.data.displayName,
            exerciseType: exercise.data.exerciseType,
            note: exercise.data.note
        };
    });

    let exes: Exercise[] = [];

    await Promise.all(exercises).then(res => {
        exes = res;
    });

    const finalPlan: TrainingPlan = {
        author: author,
        exercises: exes,
        name: trainingPlan.name
    };

    return json({
        code: 1,
        data: finalPlan,
    });
};