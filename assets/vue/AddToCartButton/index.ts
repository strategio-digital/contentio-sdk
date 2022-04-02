import { createApp } from 'vue';
import App from './src/App.vue';

export default (elm: HTMLElement) => {
    const dataId = elm.dataset.id;
    if (!dataId) {
        console.error('Error missing data-id', elm);
        return;
    }
    const productId = parseInt(dataId);

    const app = createApp(App, { productId });
    app.mount(elm);
};
