<script setup lang="ts">
import { RouterView } from 'vue-router';
import Stepper from './components/Stepper.vue';
import { useGlobalStore } from '../../store';

const store = useGlobalStore();
</script>

<template>
    <Stepper />

    {{ store }}

    <RouterView />
</template>
