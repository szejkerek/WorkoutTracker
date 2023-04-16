export const load = async ({ params }) => {
    const userInfo = await fetch(`/api/userInfo/?username=${params.username}`);

    return await userInfo.json();
}