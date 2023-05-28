export const load = async (event) => {
    const userInfo = await event.fetch(`/api/users/${event.params.uid}`);
    
    return await userInfo.json();
}