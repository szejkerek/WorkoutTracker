export enum ResultCodes {
    SUCCESS = 1,
    ERROR = 1 << 8,
    FETCH_ERROR = ERROR + (1 << 1),
    RECORD_EXISTS = ERROR + (1 << 2),
    RECORD_DOES_NOT_EXIST = ERROR + (1 << 3),
    INVALID_REQUEST_PARAMS = ERROR + (1 << 4),
    USERNAME_EXISTS = ERROR + (1 << 5),
    EMAIL_EXISTS = ERROR + (1 << 6)
}