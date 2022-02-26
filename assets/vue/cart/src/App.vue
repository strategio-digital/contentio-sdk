<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <br />
        <RouterLink to="/step2">Step 2</RouterLink>
    </nav>

    <RouterView />
</template>
