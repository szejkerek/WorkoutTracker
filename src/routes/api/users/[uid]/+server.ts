import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const userRef = firestore.collection("Users").doc(event.params.uid);
    const userResults = await userRef.get();
    const user: DatabaseReturnData = {
        id: userResults.id,
        data: userResults.data()
    };

    return json({
        code: 1,
        data: user,
    });
};