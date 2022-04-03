<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Product from '../Components/Product.vue';

@Options({
    components: {
        Product,
    },
})
export default class Cart extends Vue {}
</script>

<template>
    <Product />
</template>
