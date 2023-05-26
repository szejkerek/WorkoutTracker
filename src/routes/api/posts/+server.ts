import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const postsRef = firestore.collection("Posts");
    const postsResults = await postsRef.get();
    const posts: DatabaseReturnData[] = [];

    postsResults.forEach(doc => posts.push({
        id: doc.id,
        data: doc.data()
    }));

    const mappedPosts = posts.map(async (post): Promise<Post> => {
        const authorRef = await event.fetch(`/api/users/${post.data.authorId}`, {
            method: 'GET'
        });
        const author = await authorRef.json();
        const comments = post.data.comments;

        const mappedComments = comments.map(async (comment): Promise<PostComment> => {
            const commentAuthorRef = firestore.collection("Users").doc(comment.authorId);
            const commentAuthor: any = (await commentAuthorRef.get()).data();

            return {
                author: commentAuthor,
                content: comment.content,
                date: comment.date
            };
        });
        
        let comets: PostComment[] = [];

        await Promise.all(mappedComments).then(res => {
            comets = res;
        });
        
        return {
            id: post.id,
            author: author.data,
            content: post.data.content,
            date: post.data.date,
            likedByIds: post.data.likedByIds,
            comments: comets
        };
    });

    let pots: Post[] = [];

    await Promise.all(mappedPosts).then(res => {
        pots = res;
    });

    return json({
        code: 1,
        data: pots,
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
