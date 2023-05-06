declare type UserInfo = {
    username: String,
    gender: String,
    age: Number,
    country: String
}

declare type TodoTask = {
    id: Number,
    content: String,
    completed: Boolean,
    timestamp: Number
}

declare type StaticInfo = {
    age: Number,
    gender: String,
    displayName: String,
    avatar: String,
    heightInCM: Number
}

declare type BodyProfile = {
    weightInKG: Number,
    bodyFatInPercentage: Number,
    muscleWeightInKG: Number,
    dateOfMeasurement: Date
}

declare type User = {
    username: String,
    password: String,
    email: String,
    info: StaticInfo,
    bodyProfile: BodyProfile
}

declare type UserCategory = {
    name: String,
    userId: String,
    note: String
}