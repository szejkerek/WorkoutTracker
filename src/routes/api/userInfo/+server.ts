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