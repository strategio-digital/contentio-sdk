import { createApp } from 'vue';
import App from './App.vue';

export default () => {
    const app = createApp(App);
    app.mount('#vueCartMini');
};
