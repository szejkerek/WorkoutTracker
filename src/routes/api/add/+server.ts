import { json } from '@sveltejs/kit'

export async function POST({ request }) {
    const { x, y } = await request.json();

    return json(x + y);
}