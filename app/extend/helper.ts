export function parseInt(value: string | number) {
    if (typeof value === 'number' || !value) {
        return value;
    } 
    return Number(value) || 0;
}
export function awaitWrapper(promise: Promise<any>) {
    return promise.then((res: any) => [null, res]).catch((err: any) => [err, null]);
}