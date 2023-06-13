import { ResultCodes } from "$lib/enums/errorCodes";
import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const userRef = firestore.collection("Users").doc(event.params.uid);
    const userResults = await userRef.get();
    const user = {...userResults.data()};

    user.id = userResults.id;

    return json({
        code: 1,
        data: user,
    });
};

export const PATCH: RequestHandler = async (event) => {
    const userRef = firestore.collection("Users").doc(event.params.uid);
    const newUser: User = await event.request.json();
    const strippedUser: any = {
        email: newUser.email,
        followingIds: newUser.followingIds,
        password: newUser.password,
        staticInfo: newUser.staticInfo,
        username: newUser.username
    };

    await userRef.update(strippedUser);

    return json({
        code: ResultCodes.SUCCESS,
        data: newUser
    });
}