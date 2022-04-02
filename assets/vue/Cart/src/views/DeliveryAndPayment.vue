<script lang="ts">
import Delivery from '../components/Delivery.vue';
import Payment from '../components/Payment.vue';
import Summary from '../components/Summary.vue';
import {Options, Vue} from "vue-class-component";

@Options({components: {Delivery, Payment, Summary}})
export default class DeliveryAndPayment extends Vue {}
</script>

<template>
    <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
            <Delivery />
            <Payment />
        </div>
        <Summary />
    </div>
</template>
