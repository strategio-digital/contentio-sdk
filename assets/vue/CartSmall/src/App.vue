<script lang="ts">
import CartSmall from './components/CartSmall.vue';
import {Options, Vue} from "vue-property-decorator";

@Options({
    components: {
        CartSmall,
    },
})
export default class App extends Vue {
}
</script>

<template>
    <CartSmall/>
</template>
