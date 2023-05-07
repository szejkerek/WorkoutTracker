import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const profilesRef = firestore.collection("BodyProfiles");
    const profilesResults = await profilesRef.get();
    const profiles: DatabaseReturnData[] = [];

    profilesResults.forEach(doc => profiles.push({
        id: doc.id,
        data: doc.data()
    }));

    return json({
        code: 1,
        data: profiles,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const newProfile: UserCategory = await request.json();
    const profilesRef = firestore.collection("BodyProfiles");
    const results = await profilesRef.add(newProfile);

    return json({
        code: 1,
        data: results
    });
};