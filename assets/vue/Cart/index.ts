import { createApp } from 'vue';
import router from '../../vue/Cart/src/router/router';
import App from './src/App.vue';

export default () => {
    const app = createApp(App);
    app.use(router());
    app.mount('#vueCart');
};
