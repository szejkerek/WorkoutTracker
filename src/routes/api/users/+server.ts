import type { RequestHandler } from "./$types";
import { firestore } from '$lib/firebase/fb.server';
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const usersRef = firestore.collection("Users");
    const userResults = await usersRef.get();
    const users: DatabaseReturnData[] = [];

    userResults.forEach(doc => users.push({
        id: doc.id,
        data: doc.data()
    }));

    return json({
        code: 1,
        data: users,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const user: User = await request.json();
    const usersRef = firestore.collection("Users");
    const results = await usersRef.add(user);

    return json({
        code: 1,
        data: results
    });
};

export const DELETE: RequestHandler = async (event) => {
    const uid = await event.request.json();
    const userRef = firestore.collection("Users").doc(uid);
    await userRef.delete();

    return json({
        code: 1
    });
};

export const PATCH: RequestHandler = async (event) => {
    const {uid} = await event.request.json();
    const userRef = firestore.collection("Users").doc(uid);
    
    await userRef.update({
        username: "sadfghnm",
        password: "paswwedo"
    });

    return json({
        code: 1,
        data: uid
    });
};