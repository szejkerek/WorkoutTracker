declare enum ResultCodes {
    SUCCESS,
    DB_NO_RESPONSE,
    DB_ERROR,
}

declare type ApiResponse = {
    code: Number,
    data: any[],
}

declare type UserCategory = {
    name: String,
    userId: String,
    note: String
}

declare type Exercise = {
    categoryId: String,
    displayName: String,
    exerciseType: Number,
    note: String
}

declare type TrainingPlan = {
    userId: String,
    name: String,
    exerciseIds: String[]
}

declare type DoneExercise = {
    userId: String,
    exerciseId: String,
    date: String,
    distanceInMeters: Number,
    timeInSeconds: Number,
    weightInKG: Number,
    repetitions: Number
}

declare type Post = {
    authorId: String,
    content: String,
    date: String,
    comments: PostComment[],
    likedByIds: String[]
}

declare type PostComment = {
    authorId: String,
    content: String, 
    date: String
}