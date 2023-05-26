import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const categoriesRef = firestore.collection("UserCategories");
    const categoriesResults = await categoriesRef.get();
    const categories: DatabaseReturnData[] = [];
    
    categoriesResults.forEach(doc => categories.push({
        id: doc.id,
        data: doc.data()
    }));

    const mappedCategories = categories.map(async (cat): Promise<UserCategory> => {
        const userRef = firestore.collection("Users").doc(cat.data.userId);
        const user: any = (await userRef.get()).data();

        return {
            id: cat.id,
            name: cat.data.name,
            note: cat.data.note,
            owner: user
        };
    });

    let categs: UserCategory[] = [];

    await Promise.all(mappedCategories).then(res => {
        categs = res;
    });

    return json({
        code: 1,
        data: categs
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const newCategory: APIUserCategory = await request.json();
    const categoriesRef = firestore.collection("UserCategories");
    const results = await categoriesRef.add(newCategory);

    return json({
        code: 1,
        data: results
    });
};


export const DELETE: RequestHandler = async (event) => {
    const uid = await event.request.json();
    const categoriesRef = firestore.collection("UserCategories").doc(uid);
    await categoriesRef.delete();

    return json({
        code: 1,
    });
};

export const PATCH: RequestHandler = async (event) => {
    const {uid} = await event.request.json();
    const categoriesRef = firestore.collection("UserCategories").doc(uid);
    
    await categoriesRef.update({
        name: "category asadfghjkl",
        note: "eyah"
    });

    return json({
        code: 1,
        data: uid
    });
};