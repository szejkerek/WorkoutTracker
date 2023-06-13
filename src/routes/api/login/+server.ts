import { json, type RequestHandler } from "@sveltejs/kit";
import { ResultCodes } from "$lib/enums/errorCodes";

export const GET: RequestHandler = async (event) => {
    const username = event.url.searchParams.get("username");
    const password = event.url.searchParams.get("password");

    if(username === null || password === null) {
        return json({
            code: ResultCodes.INVALID_REQUEST_PARAMS,
            data: null
        });
    }

    const usersResponse = await event.fetch('/api/users');
    const users: User[] = (await usersResponse.json()).data;
    const userMatch = users.find(user => {
        return user.username.toLowerCase() === username?.toLowerCase()
            && user.password === password;
    });

    if(userMatch === undefined) {
        return json({
            code: ResultCodes.RECORD_DOES_NOT_EXIST,
            data: null
        });
    }

    return json({
        code: ResultCodes.SUCCESS,
        data: userMatch
    });
}