<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import {
    getDeliveryMethods,
    DeliveryMethodsType,
    DeliveryMethodType,
    updateCartDeliveryMethod,
} from '../../../../typescript/Api';
import Loader from './Loader.vue';
import { useGlobalStore } from '../../../store';

const store = useGlobalStore();

const deliveryMethods = ref<DeliveryMethodsType | undefined>(store.deliveryMethods);
const selected = ref<DeliveryMethodType>();

onMounted(async () => {
    if (!deliveryMethods.value) {
        const methods = await getDeliveryMethods({
            countryId: store.countryId,
        });
        const activeMethods = methods.filter((method) => method.active);
        deliveryMethods.value = activeMethods;
        store.setDeliveryMethods(activeMethods);
    }

    if (store.cart?.deliveryMethod) {
        selected.value = deliveryMethods.value.find((method) => method.id === store.cart?.deliveryMethod.id);
    }
});

watch(selected, async (state) => {
    if (state && store.cart?.guid) {
        const cart = await updateCartDeliveryMethod({
            cartGuid: store.cart?.guid,
            deliveryMethodId: state.id,
        });
        if (cart) {
            store.setCart(cart);
        }
    }
});
</script>

<template>
    <RadioGroup v-model="selected" class="mb-5">
        <RadioGroupLabel class="text-lg font-medium text-gray-900 block mb-4"> Zvolte dopravu </RadioGroupLabel>

        <div class="relative bg-white rounded-md -space-y-px">
            <Loader v-if="!deliveryMethods" />

            <RadioGroupOption
                as="template"
                v-for="(method, methodIdx) in deliveryMethods"
                :key="method.name"
                :value="method"
                v-slot="{ checked = false, active = false }"
            >
                <div
                    :class="[
                        methodIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                        methodIdx === deliveryMethods?.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
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
