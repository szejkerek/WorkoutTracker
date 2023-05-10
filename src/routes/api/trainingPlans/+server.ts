import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const trainingPlansRef = firestore.collection("TrainingPlans");
    const trainingPlansResults = await trainingPlansRef.get();
    const trainingPlans: DatabaseReturnData[] = [];

    trainingPlansResults.forEach(doc => trainingPlans.push({
        id: doc.id,
        data: doc.data()
    }));

    return json({
        code: 1,
        data: trainingPlans,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const newTrainingPlan: Exercise = await request.json();
    const trainingPlansRef = firestore.collection("TrainingPlans");
    const trainingPlansResults = await trainingPlansRef.add(newTrainingPlan);

    return json({
        code: 1,
        data: trainingPlansResults
    });
};


export const DELETE: RequestHandler = async (event) => {
    const uid = await event.request.json();
    const trainingPlansRef = firestore.collection("TrainingPlans").doc(uid);
    await trainingPlansRef.delete();

    return json({
        code: 1,
    });
};

export const PATCH: RequestHandler = async (event) => {
    const {uid} = await event.request.json();
    const trainingPlansRef = firestore.collection("TrainingPlans").doc(uid);
    
    await trainingPlansRef.update({
        name: "updated training plan name",
        note: "updated training plan note"
    });

    return json({
        code: 1,
        data: uid
    });
};