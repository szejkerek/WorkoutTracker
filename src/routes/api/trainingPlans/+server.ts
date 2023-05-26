import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const trainingPlansRef = firestore.collection("TrainingPlans");
    const trainingPlansResults = await trainingPlansRef.get();
    const trainingPlans: DatabaseReturnData[] = [];

    trainingPlansResults.forEach(doc => trainingPlans.push({
        id: doc.id,
        data: doc.data()
    }));

    const mappedPlans = trainingPlans.map(async (plan): Promise<TrainingPlan> => {
        const userResp = await event.fetch(`/api/users/${plan.data.userId}`, {
            method: 'GET'
        });
        const user: any = await userResp.json();
        const exercises = plan.data.exerciseIds.map(async (exerId): Promise<Exercise> => {
            const exerResp = await event.fetch(`/api/exercises/${exerId}`, {
                method: 'GET'
            });
            const exer: any = await exerResp.json();

            return {
                id: exer.id,
                category: exer.data.category,
                displayName: exer.data.displayName,
                exerciseType: exer.data.exerciseType,
                note: exer.data.note
            };
        });
        
        let exers: Exercise[] = [];

        await Promise.all(exercises).then(res => {
            exers = res;
        });

        console.log(exers);

        return {
            id: plan.id,
            author: user,
            exercises: exers,
            name: plan.data.name
        };
    });

    let plans: TrainingPlan[] = [];

    await Promise.all(mappedPlans).then(res => {
        plans = res;
    });

    return json({
        code: 1,
        data: plans,
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