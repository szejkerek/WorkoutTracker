import { ResultCodes } from "$lib/enums/errorCodes";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async (event) => {
    const newUser: NewUser = await event.request.json();
    
    if(newUser.username.length === 0 || newUser.email.length === 0 
    || newUser.password.length === 0 || newUser.gender.length === 0) {
        return json({
            code: ResultCodes.INVALID_REQUEST_PARAMS,
            data: null
        });
    }

    const usersRef = await event.fetch('/api/users');
    const users: User[] = (await usersRef.json()).data;

    let usernameRepeats = false;
    let emailRepeats = false;

    users.forEach(user => {
        if(user.username.toLowerCase() === newUser.username.toLowerCase()) {
            usernameRepeats = true;
        }

        if(user.email.toLowerCase() === newUser.email.toLowerCase()) {
            emailRepeats = true;
        }
    });

    if(usernameRepeats) {
        return json({
            code: ResultCodes.USERNAME_EXISTS,
            data: null
        });
    }

    if(emailRepeats) {
        return json({
            code: ResultCodes.EMAIL_EXISTS,
            data: null
        });
    }

    const userAddResponse = await event.fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
    });
    const newlyAddedUser = (await userAddResponse.json()).data;

    return json({
        code: ResultCodes.SUCCESS,
        data: newlyAddedUser
    });
}