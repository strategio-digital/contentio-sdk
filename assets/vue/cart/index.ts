import { Pinia } from 'pinia';
import { createApp } from 'vue';
import App from './src/App.vue';
import router from './src/router/router';

export default (store: Pinia) => {
    const app = createApp(App);
    app.use(store);
    app.use(router());
    app.mount('#vueCart');
};
