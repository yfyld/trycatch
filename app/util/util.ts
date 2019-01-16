export function awaitWrapper(promise: any) {
    return promise.then((res: any) => [null, res]).catch((err: any) => [err, null]);
}