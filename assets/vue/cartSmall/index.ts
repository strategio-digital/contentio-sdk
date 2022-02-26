import { Pinia } from 'pinia';
import { createApp } from 'vue';
import App from './src/App.vue';

export default (store: Pinia) => {
    const app = createApp(App);

    app.use(store);

    app.mount('#vueCartSmall');
};
