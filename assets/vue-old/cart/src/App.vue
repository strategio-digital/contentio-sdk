<script setup lang="ts">
import { RouterView } from 'vue-router';
import Stepper from './components/Stepper.vue';
import { useGlobalStore } from '../../store';
import { ProductType, updateCartItem } from '../../../typescript/Api';

const store = useGlobalStore();

async function handleClick(productId: ProductType['id']) {
    const quantity = store.cart?.cartItems.find((item) => item.product.id === productId)?.quantity;

    const cart = await updateCartItem({
        setup: {
            currencyId: store.currencyId,
        },
        guid: store.guid,
        productId: productId,
        quantity: quantity ? quantity + 1 : 1,
    });

    if (cart) {
        store.setCart(cart);
    }
}
</script>

<template>
    <Stepper />

    <RouterView />
</template>
