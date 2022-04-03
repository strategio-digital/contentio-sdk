<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Stepper from './Components/Stepper.vue';

@Options({
    components: {
        Stepper,
    },
})
export default class App extends Vue {}
</script>

<template>
    <Stepper />
    <RouterView />
</template>
