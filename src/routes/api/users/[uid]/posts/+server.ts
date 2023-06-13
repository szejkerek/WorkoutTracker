import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const postsRef = firestore.collection("Posts").where("authorId", "==", event.params.uid).orderBy("date", "desc");
    const postsResult = await postsRef.get();
    const authorResp = await event.fetch(`/api/users/${event.params.uid}`);
    const author = await authorResp.json();

    const rawPosts: any[] = [];
    let returnData: Post[] = [];

    postsResult.forEach(doc => {
        rawPosts.push({
            id: doc.id,
            data: doc.data()
        });
    });

    const mappedPosts = rawPosts.map(async (postData): Promise<Post> => {
        const mappedComments = postData.data.comments.map(async (com): Promise<PostComment> => {
            const commAuthorResp = await event.fetch(`/api/users/${com.authorId}`);
            const commAuthor = await commAuthorResp.json();

            return {
                author: commAuthor.data,
                content: com.content,
                date: com.date
            };
        });

        let finalComments: PostComment[] = [];

        await Promise.all(mappedComments).then(com => {
            finalComments = com;
        });

        const dat = postData.data;

        const post: Post = {
            id: postData.id,
            author: author.data,
            comments: finalComments,
            content: dat.content,
            date: dat.date,
            likedByIds: dat.likedByIds
        };

        return post;
    });

    await Promise.all(mappedPosts).then(lol => {
        returnData = lol;
    });

    return json({
        code: 1,
        data: returnData
    });
};
