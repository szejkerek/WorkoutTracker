import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const profileRef = firestore.collection("BodyProfiles");
    const profileResult = await profileRef.where("userId", "==", event.params.uid ?? "").get();
    const profile: DatabaseReturnData[] = [];

    profileResult.forEach(doc => profile.push({
        id: doc.id,
        data: doc.data()
    }));

    return json({
        code: 1,
        data: profile,
    });
};