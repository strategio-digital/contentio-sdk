import { createApp } from 'vue';
import App from './src/App.vue';

export default () => {
    const app = createApp(App);
    app.mount('#vueCartSmall');
};
