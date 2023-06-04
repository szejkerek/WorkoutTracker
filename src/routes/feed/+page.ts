import { sortPostsByScuffedDate } from "../../utilsxd/postsUtils";

export const load = async (event: any) => {
    const userPosts = await event.fetch(`/api/posts`);
    const postsResponse = await userPosts.json();
    const posts: Post[] = postsResponse.data;

    sortPostsByScuffedDate(posts);

    return {
        postsData: posts
    };
}