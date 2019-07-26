
interface Window {
    _tryCatchFlag: { [propName: string]: any },
    tryCatch: object
}


interface XMLHttpRequest {
    oldOpen(method: string, url: string): void;
    oldOpen(method: string, url: string, async: boolean, username?: string | null, password?: string | null): void;
    oldSend(body?: Document | BodyInit | null): void;
}