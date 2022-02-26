import { createPinia } from 'pinia';
import VueCart from '../../vue/cart';
import VueCartSmall from '../../vue/cartSmall';

/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

export default () => {
    const store = createPinia();

    // Cart init
    if (document.getElementById('vueCart')) {
        VueCart(store);
    }

    // Cart small init
    if (document.getElementById('vueCartSmall')) {
        VueCartSmall(store);
    }
};
