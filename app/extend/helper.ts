export function parseInt(value: string | number) {
    if (typeof value === 'number' || !value) {
        return value;
    } 
    return Number(value) || 0;
}