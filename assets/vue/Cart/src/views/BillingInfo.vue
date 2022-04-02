<script lang="ts">
import BI from '../components/BillingInfo.vue';
import Summary from '../components/Summary.vue';
import {Options, Vue} from "vue-class-component";

@Options({components: {BI, Summary}})
export default class BillingInfo extends Vue {
}
</script>

<template>
    <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <BI/>
        <Summary/>
    </div>
</template>
