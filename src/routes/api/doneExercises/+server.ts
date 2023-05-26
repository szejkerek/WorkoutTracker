import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const doneExercisesRef = firestore.collection("DoneExercises");
    const doneExercisesResults = await doneExercisesRef.get();
    const doneExercises: DatabaseReturnData[] = [];

    doneExercisesResults.forEach(doc => doneExercises.push({
        id: doc.id,
        data: doc.data()
    }));

    const mappedExercises = doneExercises.map(async (exer): Promise<DoneExercise> => {
        const userRef = firestore.collection("Users").doc(exer.data.userId);
        const user: any = (await userRef.get()).data();

        const exerciseRef = firestore.collection("Exercises").doc(exer.data.exerciseId);
        const exercise: any = (await exerciseRef.get()).data();

        return {
            id: exerciseRef.id,
            date: exer.data.date,
            distanceInMeters: exer.data.distanceInMeters,
            exercise: exercise,
            owner: user,
            repetitions: exer.data.repetitions,
            timeInSeconds: exer.data.timeInSeconds,
            weightInKG: exer.data.weightInKG
        };
    });

    let danes: DoneExercise[] = [];

    await Promise.all(mappedExercises).then(res => {
        danes = res;
    });

    return json({
        code: 1,
        data: danes,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const newDoneExercise: Exercise = await request.json();
    const doneExercisesRef = firestore.collection("DoneExercises");
    const doneExercisesResults = await doneExercisesRef.add(newDoneExercise);

    return json({
        code: 1,
        data: doneExercisesResults
    });
};


export const DELETE: RequestHandler = async (event) => {
    const uid = await event.request.json();
    const doneExercisesRef = firestore.collection("DoneExercises").doc(uid);
    await doneExercisesRef.delete();

    return json({
        code: 1,
    });
};

export const PATCH: RequestHandler = async (event) => {
    const {uid} = await event.request.json();
    const doneExercisesRef = firestore.collection("DoneExercises").doc(uid);
    
    await doneExercisesRef.update({
        userId: "updated user id ",
        exerciseId: "updated exercise id ",
        date: "updated date ",
        distanceInMeters: 100,
        timeInSeconds: 101,
        weightInKG: 102,
        repetitions: 103
    });

    return json({
        code: 1,
        data: uid
    });
};