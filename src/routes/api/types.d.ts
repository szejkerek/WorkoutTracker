declare type APIUserCategory = {
    name: String,
    userId: String,
    note: String
}

declare type APIBodyProfile = {
    weightInKG: Number,
    bodyFatInPercentage: Number,
    muscleWeightInKG: Number,
    dateOfMeasurement: String,
    userId: String
}

declare type APIDoneExercise = {
    userId: String,
    exerciseId: String,
    date: String,
    distanceInMeters: Number,
    timeInSeconds: Number,
    weightInKG: Number,
    repetitions: Number
}