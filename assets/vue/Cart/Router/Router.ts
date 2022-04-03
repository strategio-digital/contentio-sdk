import { createRouter, createWebHashHistory } from 'vue-router';
import BillingInfo from '../views/BillingInfo.vue';
import Cart from '../views/Cart.vue';
import DeliveryAndPayment from '../views/DeliveryAndPayment.vue';

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
            {
                path: '/doprava-a-platba',
                name: 'delivery-and-payment',
                component: DeliveryAndPayment,
            },
            {
                path: '/dodaci-udaje',
                name: 'billing-info',
                component: BillingInfo,
            },
        ],
    });
