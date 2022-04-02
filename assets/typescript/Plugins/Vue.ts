import { createPinia } from 'pinia';
import PiniaPersistentPlugin from 'pinia-plugin-persistedstate';
import VueCart from '../../vue/Cart';

/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

export default () => {
    const pinia = createPinia();
    pinia.use(PiniaPersistentPlugin);

    // Cart init
    if (document.getElementById('vueCart')) {
        VueCart(pinia);
    }

    // Cart small init
    if (document.getElementById('vueCartSmall')) {
        //VueCartSmall(pinia);
    }

    // Add to cart btn
    Array.from(document.querySelectorAll('[data-vue-add-to-cart]')).forEach((elm) => {
        //VueAddToCartBtn(pinia, elm as HTMLElement);
    });
};
