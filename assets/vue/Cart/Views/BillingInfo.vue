<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BI from '../Components/BillingInfo.vue';
import Summary from '../Components/Summary.vue';

@Options({
    components: {
        BI,
        Summary,
    },
})
export default class BillingInfo extends Vue {}
</script>

<template>
    <BI />
</template>
