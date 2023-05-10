import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const postsRef = firestore.collection("Posts");
    const postsResults = await postsRef.get();
    const posts: DatabaseReturnData[] = [];

    postsResults.forEach(doc => posts.push({
        id: doc.id,
        data: doc.data()
    }));

    return json({
        code: 1,
        data: posts,
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const newPost: Post = await request.json();
    const postsRef = firestore.collection("Posts");
    const postsResults = await postsRef.add(newPost);

    return json({
        code: 1,
        data: postsResults
    });
};

export const DELETE: RequestHandler = async (event) => {
    const uid = await event.request.json();
    const postsRef = firestore.collection("Posts").doc(uid);
    await postsRef.delete();

    return json({
        code: 1,
    });
};
