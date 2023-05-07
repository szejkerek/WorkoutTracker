import { firestore } from "$lib/firebase/fb.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const categoryRef = firestore.collection("UserCategories");
    const categoryResults = await categoryRef.where("userId", "==", event.params.uid ?? "").get();
    const category: DatabaseReturnData[] = [];

    categoryResults.forEach(doc => category.push({
        id: doc.id,
        data: doc.data()
    }));

    return json({
        code: 1,
        data: category,
    });
};