import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Step2View from '../views/Step2View.vue';

export default () =>
    createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: '/',
                component: HomeView,
            },
            {
                path: '/step2',
                component: Step2View,
            },
        ],
    });
