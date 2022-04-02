import { Pinia } from 'pinia';
import { createApp } from 'vue';
import router from '../../vue/Cart/src/router/router';
import App from './src/App.vue';

export default (store: Pinia) => {
    const app = createApp(App);
    app.use(store);
    app.use(router());
    app.mount('#vueCart');
};
