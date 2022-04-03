import { createApp } from 'vue';
import App from './App.vue';
import router from './Router/Router';

export default () => {
    const app = createApp(App);
    app.use(router());
    app.mount('#vueCart');
};
