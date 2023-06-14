import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";
import type { Exercise } from "../../types";
import { ResultCodes } from "$lib/enums/errorCodes";

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
        const mappedUser: User = {
            email: user.email,
            followingIds: user.followingIds,
            id: (await userRef.get()).id,
            password: user.password,
            staticInfo: user.staticInfo,
            username: user.username
        };

        const exerciseRef = firestore.collection("Exercises").doc(exer.data.exerciseId);
        const exercise: any = await exerciseRef.get();
        const exerData = exercise.data();

        exerData.id = exercise.id;

        const exerCategoryRef = firestore.collection("UserCategories").doc(exerData.categoryId);
        const exerCategory: any = await exerCategoryRef.get();
        const exerCatData = exerCategory.data();

        exerCatData.id = exerCategory.id;

        const mappedExer: Exercise = {
            category: exerCatData,
            displayName: exerData.displayName,
            exerciseType: exerData.exerciseType,
            id: exerData.id,
            note: exerData.note
        };

        return {
            id: exerciseRef.id,
            date: exer.data.date,
            distanceInMeters: exer.data.distanceInMeters,
            exercise: mappedExer,
            owner: mappedUser,
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
        code: ResultCodes.SUCCESS,
        data: danes,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const newDoneExercise: DoneExercise = await request.json();
    const strippedExercise = {
        date: newDoneExercise.date,
        distanceInMeters: newDoneExercise.distanceInMeters,
        exerciseId: newDoneExercise.exercise.id,
        userId: newDoneExercise.owner.id,
        repetitions: newDoneExercise.repetitions,
        timeInSeconds: newDoneExercise.timeInSeconds,
        weightInKG: newDoneExercise.weightInKG
    };
    const doneExercisesRef = firestore.collection("DoneExercises");
    const doneExercisesResults = await doneExercisesRef.add(strippedExercise);

    return json({
        code: ResultCodes.SUCCESS,
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