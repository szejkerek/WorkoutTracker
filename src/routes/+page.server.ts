import type { PageData } from "./$types";

export const load = ({ url }): PageData => {
    console.log('server comm');
    
    return {
        value: 10,
        owner: 'Me :3',
        cos: url.searchParams.get('cos')
    };
}