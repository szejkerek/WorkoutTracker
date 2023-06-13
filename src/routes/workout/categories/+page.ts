export const load = async (event: any) => {
    const userCategories = await event.fetch(`/api/exerciseCategories`);
    const categoriesResponse = await userCategories.json();
    const categories: UserCategory[] = categoriesResponse.data;

    const exercisesRes = await event.fetch("/api/exercises");
    const exercisesRef = await exercisesRes.json();
    const exercises: Exercise[] = exercisesRef.data;

    return {
        categoriesData: categories,
        exercisesData: exercises
    };
}