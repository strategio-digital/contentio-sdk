<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import CartSmall from './components/CartSmall.vue';

@Options({
    components: {
        CartSmall,
    },
})
export default class App extends Vue {}
</script>

<template>
    <CartSmall />
</template>
