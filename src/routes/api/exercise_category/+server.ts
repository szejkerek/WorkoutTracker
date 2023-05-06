import { firestore } from '../../../lib/firebase/fb.server.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
    let username = url.searchParams.get('username');
    let idResult = await firestore.collection("Users").where("username", "==", `${username}`).get();
    let userID: String = "";

    if (idResult.size === 0) {
        return json({ code: 124, data: null });
    }

    idResult.forEach(doc => {
        userID = doc.id;
    })

    let catResponse: ApiResponse = {
        code: 0,
        data: []
    };
    let result = await firestore.collection("UserCategories").where("userId", "==", `${userID}`).get();

    if (result.size === 0) {
        return json({ code: 137, data: userID });
    }

    catResponse.code = 1;
    catResponse.data = [];

    result.forEach(doc => {
        let category = doc.data();

        catResponse.data = [...catResponse.data, category];
    });

    return json(catResponse);
}

export const POST = async ({ request }) => {

}