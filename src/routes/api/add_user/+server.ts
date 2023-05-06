import { firestore } from '../../../lib/firebase/fb.server.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    let newUser: {
        email: String,
        username: String
    } = await request.json();

    const ref = await firestore.collection('Users').add({ user: newUser, losowexd: [1, 2, 3, 77] });

    return json({ ref });
}