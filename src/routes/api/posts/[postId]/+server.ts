import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const postRef = firestore.collection("Posts").doc(event.params.postId);
    const post: any = (await postRef.get()).data();

    const userResp = await event.fetch(`/api/users/${post.authorId}`, {
        method: 'GET'
    });
    const author = await userResp.json();

    const comments = post.comments.map(async (comment): Promise<PostComment> => {
        const commentAuthorResp = await event.fetch(`/api/users/${comment.authorId}`, {
            method: 'GET'
        });
        const commentAuthor = await commentAuthorResp.json();

        commentAuthor.id = comment.authorId;

        return {
            author: commentAuthor,
            content: comment.content,
            date: comment.date
        };
    });

    let coms: PostComment[] = [];

    await Promise.all(comments).then(res => {
        coms = res;
    });

    const finalPost: Post = {
        id: postRef.id,
        author: author,
        comments: coms,
        content: post.content,
        date: post.date,
        likedByIds: post.likedByIds
    };

    return json({
        code: 1,
        data: finalPost,
    });
};

export const PATCH: RequestHandler = async (event) => {
    const postRef = firestore.collection("Posts").doc(event.params.postId);
    const newPost: Post = await event.request.json();
    const strippedPost: any = {
        likedByIds: newPost.likedByIds,
        content: newPost.content,
        date: newPost.date,
        authorId: newPost.author.id,
        comments: []
    };

    newPost.comments.forEach(com => {
        strippedPost.comments.push({
            authorId: com.author.id,
            content: com.content,
            date: com.date
        });
    });

    await postRef.update(strippedPost);
    
    return json({
        code: 1,
        data: strippedPost
    });
};