<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import {
    getPaymentMethods,
    PaymentMethodType,
    PaymentMethodsType,
    updateCartPaymentMethod,
} from '../../../../typescript/Api';
import Loader from './Loader.vue';
import { useGlobalStore } from '../../../store';

const store = useGlobalStore();

const paymentMethods = ref<PaymentMethodsType | undefined>(store.paymentMethods);
const selected = ref<PaymentMethodType>();
const excludedPaymentMethods = ref<PaymentMethodsType>();

const onPaymentMethodChange = async (newVal: PaymentMethodType) => {
    const cart = await updateCartPaymentMethod({
        setup: {
            currencyId: store.currencyId,
        },
        guid: store.guid,
        paymentMethodId: newVal.id,
    });
    if (cart) {
        store.setCart(cart);
    }
};

onMounted(async () => {
    if (!paymentMethods.value) {
        const methods = await getPaymentMethods({
            currencyId: store.currencyId,
        });
        const activeMethods = methods.filter((method) => method.active);
        paymentMethods.value = activeMethods;
        store.setPaymentMethods(activeMethods);
    }

    if (store.cart?.paymentMethod) {
        selected.value = paymentMethods.value.find((method) => method.id === store.cart?.paymentMethod.id);
    }
});

watch(store, async (state) => {
    if (state && state.cart?.deliveryMethod && excludedPaymentMethods) {
        excludedPaymentMethods.value = store.deliveryMethods?.find(
            (item) => item.id === store.cart?.deliveryMethod.id,
        )?.excludedPaymentMethods;

        if (excludedPaymentMethods.value?.some(({ id }) => id === selected.value?.id)) {
            selected.value = undefined;
        }
    }
});
</script>

<template>
    <RadioGroup v-model="selected" @update:modelValue="onPaymentMethodChange" class="mb-5">
        <RadioGroupLabel class="text-lg font-medium text-gray-900 block mb-4"> Zvolte platbu </RadioGroupLabel>

        <div class="relative bg-white rounded-md -space-y-px">
            <Loader v-if="!paymentMethods" />

            <RadioGroupOption
                as="template"
                v-for="(method, methodIdx) in paymentMethods"
                v-slot="{ checked = false, active = false, disabled = false }"
                :key="method.name"
                :value="method"
                :disabled="excludedPaymentMethods?.some(({ id }) => id === method.id)"
            >
                <div
                    :class="[
                        methodIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                        methodIdx === paymentMethods?.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                        checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                        'relative border p-4 flex  focus:outline-none',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
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
                                :class="[
                                    'block text-sm font-medium',
                                    checked ? 'text-indigo-900' : 'text-gray-900',
                                    disabled ? 'text-gray-300' : '',
                                ]"
                            >
                                {{ method.name }}
                            </RadioGroupLabel>
                            <RadioGroupDescription
                                as="span"
                                :class="[
                                    'block text-sm',
                                    checked ? 'text-indigo-700' : 'text-gray-500',
                                    disabled ? 'text-gray-300' : '',
                                ]"
                            >
                                {{ method.description }}
                            </RadioGroupDescription>
                        </div>
                    </div>

                    <RadioGroupDescription
                        :class="[
                            'ml-6 pl-1 text-sm text-right self-center text-indigo-900 font-medium',
                            disabled ? 'text-gray-300' : '',
                        ]"
                        >{{ method.price }} Kč</RadioGroupDescription
                    >
                </div>
            </RadioGroupOption>
        </div>
    </RadioGroup>
</template>
