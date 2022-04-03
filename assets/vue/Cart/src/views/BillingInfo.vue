<script lang="ts">
import BI from '../components/BillingInfo.vue';
import Summary from '../components/Summary.vue';
import {Options, Vue} from "vue-class-component";

@Options({components: {BI, Summary}})
export default class BillingInfo extends Vue {
}
</script>

<template>
    <BI/>
</template>
