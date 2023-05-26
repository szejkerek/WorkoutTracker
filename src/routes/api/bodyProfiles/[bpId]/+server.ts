import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const profileRef = firestore.collection("BodyProfiles").doc(event.params.bpId);
    const profile: any = (await profileRef.get()).data();
    const userResp = await event.fetch(`/api/users/${profile.userId}`, {
        method: 'GET'
    });
    const user: any = await userResp.json();

    const finalProfile: BodyProfile = {
        id: profile.id,
        bodyFatInPercentage: profile.bodyFatInPercentage,
        dateOfMeasurement: profile.dateOfMeasurement,
        muscleWeightInKG: profile.muscleWeightInKG,
        owner: user,
        weightInKG: profile.weightInKG
    };

    return json({
        code: 1,
        data: finalProfile,
    });
};