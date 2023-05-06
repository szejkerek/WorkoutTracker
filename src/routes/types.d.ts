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