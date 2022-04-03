import Cart from '../../vue/Cart';
import CartButton from '../../vue/CartButton';
import CartMini from '../../vue/CartMini';

export default () => {
    // Cart
    if (document.getElementById('vueCart')) {
        Cart();
    }

    // Mini cart
    if (document.getElementById('vueCartMini')) {
        CartMini();
    }

    // Add to cart btn
    Array.from(document.querySelectorAll('[data-vue-add-to-cart]')).forEach((elm) => {
        CartButton(elm as HTMLElement);
    });
};
