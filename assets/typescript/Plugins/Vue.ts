import VueAddToCart from '../../vue/AddToCartButton';
import VueCart from '../../vue/Cart';
import VueCartSmall from '../../vue/CartSmall';

export default () => {
    // Cart init
    if (document.getElementById('vueCart')) {
        VueCart();
    }

    // Cart small init;
    if (document.getElementById('vueCartSmall')) {
        VueCartSmall();
    }

    // Add to cart btn
    Array.from(document.querySelectorAll('[data-vue-add-to-cart]')).forEach((elm) => {
        VueAddToCart(elm as HTMLElement);
    });
};
