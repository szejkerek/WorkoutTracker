export const load = async (event: any) => {
    const userCategories = await event.fetch(`/api/exerciseCategories`);
    const categoriesResponse = await userCategories.json();
    const categories: UserCategory[] = categoriesResponse.data;

    return {
        categoriesData: categories
    };
}