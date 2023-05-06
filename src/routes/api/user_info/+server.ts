import { firestore } from '../../../lib/firebase/fb.server.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
    let username = url.searchParams.get('username');
    let result = await firestore.collection("Users").where("username", "==", `${username}`).get();

    if (result.size === 0) {
        return json({ code: 124, data: null });
    }

    let user;

    result.forEach(doc => {
        user = doc.data();
    });

    return json({ code: 1, data: user });
}