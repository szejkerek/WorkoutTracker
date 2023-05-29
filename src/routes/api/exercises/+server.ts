import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const exercisesRef = firestore.collection("Exercises");
    const exercisesResults = await exercisesRef.get();
    const exercises: DatabaseReturnData[] = [];
    
    exercisesResults.forEach(doc => exercises.push({
        id: doc.id,
        data: doc.data()
    }));

    const mappedExercises = exercises.map(async (cat): Promise<Exercise> => {
        const categoryResp = await event.fetch(`/api/exerciseCategories/${cat.data.categoryId}`, {
            method: 'GET'
        });
        const category = await categoryResp.json();
        
        return {
            id: cat.id,
            category: category.data,
            displayName: cat.data.displayName,
            exerciseType: cat.data.exerciseType,
            note: cat.data.note,
        };
    });

    let exers: Exercise[] = [];

    await Promise.all(mappedExercises).then(res => {
        exers = res;
    });

    return json({
        code: 1,
        data: exers
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