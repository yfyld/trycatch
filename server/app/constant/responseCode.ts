
const SUCCESS = 2000;
const ERROR = 3000;
const ERROR_ARGUMENT = 3001;
const NO_LOGIN = 4001;
const NO_AUTH = 4003;
const NO_CONTENT = 4004;

export {
    SUCCESS,
    ERROR,
    ERROR_ARGUMENT,
    NO_LOGIN,
    NO_AUTH,
    NO_CONTENT
}

export type TSUCCESS = typeof SUCCESS;
export type TERROR = typeof ERROR;
export type TERROR_ARGUMENT = typeof ERROR_ARGUMENT;
export type TNO_LOGIN = typeof NO_LOGIN;
export type TNO_AUTH = typeof NO_AUTH;
export type TNO_CONTENT = typeof NO_CONTENT;

export interface IResponseCode {
    SUCCESS: TSUCCESS,
    ERROR: TERROR,
    ERROR_ARGUMENT: TERROR_ARGUMENT,
    NO_LOGIN: TNO_LOGIN,
    NO_AUTH: TNO_AUTH,
    NO_CONTENT: TNO_CONTENT
}