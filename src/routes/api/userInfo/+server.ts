import { json } from '@sveltejs/kit';

export const GET = ({ url }) => {
    let username = url.searchParams.get('username');

    return json({
        username: username,
        gender: 'nwm',
        age: 22,
        country: 'Poland'
    });
}

export const POST = async ({ request }) => {
    let user: {
        username: string,
        gender: string,
        age: number,
        country: string
    } = await request.json();

    console.log("Added user:");
    console.table(user);
    
} 
