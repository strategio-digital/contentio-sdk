/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

const setCookie = (name: string, value: string, hours: number = 365 * 24, path: string = '/'): void => {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}${expires}; path=${path}`;
};

const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(`${name}=`) === 0) {
            return cookie.substring(`${name}=`.length, cookie.length);
        }
    }
    return null;
};

export default {
    set: setCookie,
    get: getCookie,
};
