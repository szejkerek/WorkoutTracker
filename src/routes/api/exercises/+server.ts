import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const exercisesRef = firestore.collection("Exercises");
    const exercisesResults = await exercisesRef.get();
    const exercises: DatabaseReturnData[] = [];

    exercisesResults.forEach(doc => exercises.push({
        id: doc.id,
        data: doc.data()
    }));

    return json({
        code: 1,
        data: exercises,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const newExercise: Exercise = await request.json();
    const exercisesRef = firestore.collection("Exercises");
    const results = await exercisesRef.add(newExercise);

    return json({
        code: 1,
        data: results
    });
};


export const DELETE: RequestHandler = async (event) => {
    const uid = await event.request.json();
    const exercisesRef = firestore.collection("Exercises").doc(uid);
    await exercisesRef.delete();

    return json({
        code: 1,
    });
};

export const PATCH: RequestHandler = async (event) => {
    const {uid} = await event.request.json();
    const exercisesRef = firestore.collection("Exercises").doc(uid);
    
    await exercisesRef.update({
        displayName: "sample name",
        note: "yeahnote"
    });

    return json({
        code: 1,
        data: uid
    });
};