import type { RequestHandler } from "./$types";
import { firestore } from '$lib/firebase/fb.server';
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const usersRef = firestore.collection("Users");
    const userResults = await usersRef.get();
    const users: User[] = [];

    userResults.forEach(doc => {
        const current: any = doc.data();

        users.push({
            id: doc.id,
            username: current.username,
            email: current.email,
            followingIds: current.followingIds,
            password: current.password,
            staticInfo: current.staticInfo
        });
    });

    return json({
        code: 1,
        data: users,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const user: User = await request.json();
    const usersRef = firestore.collection("Users");
    const newUser = {
        username: user.username,
        password: user.password,
        email: user.email,
        staticInfo: user.staticInfo,
        followingIds: user.followingIds
    };
    const results = await usersRef.add(newUser);

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