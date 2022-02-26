<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { getPaymentMethods, PaymentMethodsType } from '../../../../typescript/Api';
import Loader from './Loader.vue';
import { useGlobalStore } from '../../../store/counter';

const store = useGlobalStore();

const paymentMethods = ref<PaymentMethodsType>();
const selected = ref();

onMounted(async () => {
    const methods = await getPaymentMethods({
        currencyId: store.currencyId,
    });
    console.log(methods, 'payment');
    if (methods) {
        paymentMethods.value = methods.filter((method) => method.active);
    }
});

watch(selected, () => {
    if (selected.value) {
        store.setPayment(selected.value);
    }
});
</script>

<template>
    <RadioGroup v-model="selected" class="mb-5">
        <RadioGroupLabel class="text-lg font-medium text-gray-900 block mb-4"> Zvolte platbu </RadioGroupLabel>

        <div class="relative bg-white rounded-md -space-y-px">
            <Loader v-if="!paymentMethods" />

            <RadioGroupOption
                as="template"
                v-for="(method, methodIdx) in paymentMethods"
                :key="method.name"
                :value="method"
                v-slot="{ checked = false, active = false }"
            >
                <div
                    :class="[
                        methodIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                        methodIdx === paymentMethods?.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                        checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                        'relative border p-4 flex cursor-pointer focus:outline-none',
                    ]"
                >
                    <div class="flex flex-1 items-center text-sm">
                        <span
                            :class="[
                                checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                'h-4 w-4 rounded-full border flex items-center justify-center',
                            ]"
                            aria-hidden="true"
                        >
                            <span class="rounded-full bg-white w-1.5 h-1.5" />
                        </span>

                        <div class="ml-5 flex flex-1 flex-col">
                            <RadioGroupLabel
                                as="span"
                                :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium']"
                            >
                                {{ method.name }}
                            </RadioGroupLabel>
                            <RadioGroupDescription
                                as="span"
                                :class="[checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm']"
                            >
                                {{ method.description }}
                            </RadioGroupDescription>
                        </div>
                    </div>

                    <RadioGroupDescription class="ml-6 pl-1 text-sm text-right self-center text-indigo-900 font-medium"
                        >{{ method.price }} Kč</RadioGroupDescription
                    >
                </div>
            </RadioGroupOption>
        </div>
    </RadioGroup>
</template>
