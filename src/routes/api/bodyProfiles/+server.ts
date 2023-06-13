import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ResultCodes } from "$lib/enums/errorCodes";

export const GET: RequestHandler = async () => {
    const profilesRef = firestore.collection("BodyProfiles");
    const profilesResults = await profilesRef.get();
    const profiles: DatabaseReturnData[] = [];

    profilesResults.forEach(doc => profiles.push({
        id: doc.id,
        data: doc.data()
    }));
    
    const mappedProfiles = profiles.map(async (prof): Promise<BodyProfile> => {
        const userRef = firestore.collection("Users").doc(prof.data.userId);
        const user: any = (await userRef.get()).data();

        return {
            id: prof.id,
            weightInKG: prof.data.weightInKG,
            bodyFatInPercentage: prof.data.bodyFatInPercentage,
            muscleWeightInKG: prof.data.muscleWeightInKG,
            dateOfMeasurement: prof.data.dateOfMeasurement,
            owner: user
        };
    });

    let profes: BodyProfile[] = [];

    await Promise.all(mappedProfiles).then(res => {
        profes = res;
    });

    return json({
        code: 1,
        data: profes,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const newProfile: BodyProfile = await request.json();
    const strippedProfile = {
        bodyFatInPercentage: newProfile.bodyFatInPercentage,
        dateOfMeasurement: newProfile.dateOfMeasurement,
        muscleWeightInKG: newProfile.muscleWeightInKG,
        userId: newProfile.owner.id,
        weightInKG: newProfile.weightInKG
    }
    const profilesRef = firestore.collection("BodyProfiles");
    const results = await profilesRef.add(strippedProfile);

    return json({
        code: ResultCodes.SUCCESS,
        data: newProfile
    });
};

export const DELETE: RequestHandler = async (event) => {
    const uid = await event.request.json();
    const categoriesRef = firestore.collection("BodyProfiles").doc(uid);
    await categoriesRef.delete();

    return json({
        code: 1,
    });
};
