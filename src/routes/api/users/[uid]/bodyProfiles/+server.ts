import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ResultCodes } from "$lib/enums/errorCodes";

export const GET: RequestHandler = async (event) => {
    const bodyProfilesRef = firestore.collection("BodyProfiles").where("userId", "==", event.params.uid);
    const bodyProfilesResult = await bodyProfilesRef.get();

    if(bodyProfilesResult === undefined) {
        return json({
            code: ResultCodes.FETCH_ERROR,
            data: null
        });
    }

    const authorRef = firestore.collection("Users").doc(event.params.uid);
    const author = await authorRef.get();

    if(bodyProfilesResult === undefined) {
        return json({
            code: ResultCodes.USER_DOES_NOT_EXIST,
            data: null
        });
    }

    const authorObj: User = {
        id: author.id,
        username: author.data()?.username,
        email: author.data()?.email,
        followingIds: author.data()?.followingIds,
        password: author.data()?.password,
        staticInfo: author.data()?.staticInfo
    };

    const rawProfiles: any[] = [];

    bodyProfilesResult.forEach(doc => {
        rawProfiles.push({
            id: doc.id,
            data: doc.data()
        });
    });

    const returnData: BodyProfile[] = rawProfiles.map((prof): BodyProfile => {
        const xd: any = prof.data;

        return {
            id: prof.id,
            owner: authorObj,
            bodyFatInPercentage: xd.bodyFatInPercentage,
            dateOfMeasurement: xd.dateOfMeasurement,
            muscleWeightInKG: xd.muscleWeightInKG,
            weightInKG: xd.weightInKG
        };
    });

    return json({
        code: ResultCodes.SUCCESS,
        data: returnData
    });
};
