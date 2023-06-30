export enum ExerciseEnum {
    None = 0,
    Weight = 1,
    Reps = 1 << 1,
    Distance = 1 << 2,
    Time = 1 << 3,
    WeightReps = Weight + Reps,
    WeightDistance = Weight + Distance,
    WeightTime = Time + Weight,
    TimeReps = Time + Reps,
    DistanceTime = Distance + Time,
    RepsDistance = Reps + Distance
}