export const load = async (event) => {
    const userInfo = await event.fetch(`/api/users/${event.params.uid}`);
    const userResponse = await userInfo.json();

    const userPosts = await event.fetch(`/api/users/${event.params.uid}/posts`);
    const postsResponse = await userPosts.json();

    return {
        userData: userResponse.data,
        postsData: postsResponse.data
    };
}