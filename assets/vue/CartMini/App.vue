<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import CartMini from './Components/CartMini.vue';

@Options({
    components: {
        CartMini,
    },
})
export default class App extends Vue {}
</script>

<template>
    <CartMini />
</template>
