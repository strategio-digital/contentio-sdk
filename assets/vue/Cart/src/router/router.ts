import { createRouter, createWebHashHistory } from 'vue-router';
import Cart from './../views/Cart.vue';

export default () =>
    createRouter({
        // linkActiveClass: 'test',
        history: createWebHashHistory(),
        routes: [
            {
                path: '/',
                name: 'cart',
                component: Cart,
            },
            // {
            //     path: '/doprava-a-platba',
            //     name: 'delivery-and-payment',
            //     component: DeliveryAndPayment,
            // },
            // {
            //     path: '/dodaci-udaje',
            //     name: 'billing-info',
            //     component: BillingInfo,
            // },
        ],
    });
