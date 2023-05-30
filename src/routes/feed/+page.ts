export const load = async (event) => {
    const userPosts = await event.fetch(`/api/posts`);
    const postsResponse = await userPosts.json();

    return {
        postsData: postsResponse.data
    };
}