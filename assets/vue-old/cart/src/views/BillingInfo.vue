<script setup lang="ts">
import BillingInfo from '../components/BillingInfo.vue';
import Summary from '../components/Summary.vue';
</script>

<template>
    <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <BillingInfo />

        <Summary />
    </div>
</template>
