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
    gender: 'Male' | 'Female' | 'Other' | 'Murcin',
    displayName: String,
    avatarPath: String,
    heightInCM: Number
}

declare type BodyProfile = {
    id: String,
    weightInKG: Number,
    bodyFatInPercentage: Number,
    muscleWeightInKG: Number,
    dateOfMeasurement: String,
    owner: User
}

declare type User = {
    id: String,
    username: String,
    password: String,
    email: String,
    staticInfo: StaticInfo,
    followingIds: String[]
}

declare type UserCategory = {
    id: String,
    name: String,
    owner: User,
    note: String
}