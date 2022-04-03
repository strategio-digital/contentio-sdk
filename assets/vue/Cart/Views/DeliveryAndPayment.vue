<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Delivery from '../Components/Delivery.vue';
import Payment from '../Components/Payment.vue';
import Summary from '../Components/Summary.vue';

@Options({
    components: {
        Delivery,
        Payment,
        Summary,
    },
})
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
