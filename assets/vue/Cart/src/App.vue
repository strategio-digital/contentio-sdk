<template>
    <Stepper />
    <RouterView />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Stepper from './components/Stepper.vue';

@Options({ components: { Stepper } })
export default class App extends Vue {}
</script>
