/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

let countDownHash: null | string = (Math.random() + 1).toString(36).substring(7);

export default () => {
    const timeout = setTimeout(() => {
        countDownHash = null;
        clearTimeout(timeout);
    }, 15 * 1000);
}

export const isReady = () => countDownHash === null;
