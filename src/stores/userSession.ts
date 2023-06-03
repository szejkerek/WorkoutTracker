import { derived, writable } from "svelte/store";

const getUserSession = (): User | null => {
    try {
        const storedSession = localStorage.getItem('sessionData');

        return storedSession ? JSON.parse(storedSession) : null;
    } catch (err) {
        console.error('Error while accessing localStorage: ', err);
    }

    return null;
}

const setUserSession = (user: User | null) => {
    try {
        localStorage.setItem('sessionData', JSON.stringify(user));
    } catch(err) {
        console.error('Error while accessing localStorage:', err);
    }
}

const userSessionStore = writable<User | null>(getUserSession());

userSessionStore.subscribe(user => setUserSession(user));

export const userSessionData = {
    subscribe: userSessionStore.subscribe,
    set: userSessionStore.set
}