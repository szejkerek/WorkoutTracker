import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const exerciseRef = firestore.collection("Exercises").doc(event.params.exerId);
    const exercise: any = (await exerciseRef.get()).data();
    const categoryResp = await event.fetch(`/api/exerciseCategories/${exercise.categoryId}`, {
        method: 'GET'
    });
    const category: any = await categoryResp.json();
    const exerciseFinal: Exercise = {
        displayName: exercise.displayName,
        note: exercise.note,
        exerciseType: exercise.exerciseType,
        category: category
    };

    return json({
        code: 1,
        data: exerciseFinal
    });
};