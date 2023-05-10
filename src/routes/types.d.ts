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
    category: UserCategory,
    displayName: String,
    exerciseType: Number,
    note: String
}

declare type TrainingPlan = {
    author: User,
    name: String,
    exercises: Exercise[]
}

declare type DoneExercise = {
    owner: User,
    exercise: Exercise,
    date: String,
    distanceInMeters: Number,
    timeInSeconds: Number,
    weightInKG: Number,
    repetitions: Number
}

declare type Post = {
    author: User,
    content: String,
    date: String,
    comments: PostComment[],
    likedByIds: String[]
}

declare type PostComment = {
    author: User,
    content: String, 
    date: String
}