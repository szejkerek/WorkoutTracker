import { sortPostsByScuffedDate } from '../../../utilsxd/postsUtils.js';

export const load = async (event) => {
    const userInfo = await event.fetch(`/api/users/${event.params.uid}`);
    const userResponse = await userInfo.json();

    const userPosts = await event.fetch(`/api/users/${event.params.uid}/posts`);
    const postsResponse = await userPosts.json();
    const posts: Post[] = postsResponse.data;

    sortPostsByScuffedDate(posts);

    return {
        userData: userResponse.data,
        postsData: posts
    };
}