export function transformQueryToStr(query) {
    return Object.keys(query).reduce((total, item) => `${total ? 'and' : ''}${item}:${query[item]}`, '');
}

export function addSelect(str, pageSize = 20, page = 1) {
    return `${str} | select * limit ${pageSize}`
} 