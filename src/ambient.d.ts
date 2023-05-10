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

declare interface DatabaseReturnData {
    id: string,
    data: any
}

declare type StaticInfo = {
    age: Number,
    gender: 'Male' | 'Female' | 'Other',
    displayName: String,
    avatarPath: String,
    heightInCM: Number
}

declare type BodyProfile = {
    weightInKG: Number,
    bodyFatInPercentage: Number,
    muscleWeightInKG: Number,
    dateOfMeasurement: String,
    userId: String
}

declare type User = {
    username: String,
    password: String,
    email: String,
    staticInfo: StaticInfo,
    followingIds: String[]
}

declare type UserCategory = {
    name: String,
    userId: String,
    note: String
}