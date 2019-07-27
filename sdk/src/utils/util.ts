export function getFlag(key: string) {
    window._tryCatchFlag = window._tryCatchFlag || {};
    return window._tryCatchFlag[key];
}

export function setFlag(key: string, value: any) {
    window._tryCatchFlag = window._tryCatchFlag || {};
    window._tryCatchFlag[key] = value;
}

export function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null) {
        return ''
    }
    return document.location.href;
}

export function class2Type(obj: any): string {
    return Object.prototype.toString.call(obj);
}

export function oneOf(one: string, all: string[]): boolean {
    for (let i in all) {
        if (one === i) {
            return true;
        }
    }
    return false;
}

export function hashCode(str: string): number {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}


export function isError(value: any) {
    switch (Object.prototype.toString.call(value)) {
        case '[object Error]': return true;
        case '[object Exception]': return true;
        case '[object DOMException]': return true;
        default: return value instanceof Error;
    }
}

export function isString(value: any) {
    return Object.prototype.toString.call(value) === '[object String]';
}

export function getEnvBasedOnHost() {
    const location = window.location;
    if (!location) {
        return 'node';
    } 
    const host = location.host;
    if (host.match(/\.qa/)) {
        return 'qa';
      } else if (host.match(/\.pre/)) {
        return 'pre';
      } else if (host.match(/local|(\d+\.\d+\.\d+\.\d+)/)) {
        return 'dev';
      } else {
        return 'online';
      }
}


export function getErrorTag() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}${month}${day}`
}