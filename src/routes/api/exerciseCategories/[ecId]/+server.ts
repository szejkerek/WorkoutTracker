import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const categoryRef = firestore.collection("UserCategories").doc(event.params.ecId);
    const category: any = (await categoryRef.get()).data();
    const userRef = firestore.collection("Users").doc(category.userId);
    const userRes: any = await userRef.get();
    const user = userRes.data();

    user.id = userRes.id;
    
    const categ: UserCategory = {
        id: categoryRef.id,
        name: category.name,
        note: category.note,
        owner: user
    };

    return json({
        code: 1,
        data: categ,
    });
};

