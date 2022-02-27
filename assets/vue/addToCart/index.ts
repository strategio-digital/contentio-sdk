import { Pinia } from 'pinia';
import { createApp } from 'vue';
import App from './src/App.vue';

export default (store: Pinia, elm: HTMLElement) => {
    const dataId = elm.dataset.id;
    if (!dataId) {
        return;
    }
    const productId = parseInt(dataId);

    const app = createApp(App, { productId });
    app.use(store);
    app.mount(elm);
};
