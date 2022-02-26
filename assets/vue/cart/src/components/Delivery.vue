<script setup lang="ts">
import { ref } from 'vue';
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

const deliveries = [
    {
        name: 'Osobní odběr - České Budějovice',
        description: 'Balík převezmete u nás (pouze po telefonické domluvě).',
        price: 89,
    },
    { name: 'Zásilkovna', description: 'Balík převezmete ve zvolené Zásilkovně.', price: 45 },
    { name: 'Česká Pošta - na poštu', description: 'Balík převezmete na zvolené poště.', price: 89 },
];

const selected = ref(deliveries[0]);
</script>

<template>
    <RadioGroup v-model="selected" class="mb-5">
        <RadioGroupLabel class="text-lg font-medium text-gray-900 block mb-4"> Zvolte dopravu </RadioGroupLabel>

        <div class="relative bg-white rounded-md -space-y-px">
            <RadioGroupOption
                as="template"
                v-for="(delivery, deliveryIdx) in deliveries"
                :key="delivery.name"
                :value="delivery"
                v-slot="{ checked = false, active = false }"
            >
                <div
                    :class="[
                        deliveryIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                        deliveryIdx === deliveries.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
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
                                {{ delivery.name }}
                            </RadioGroupLabel>
                            <RadioGroupDescription
                                as="span"
                                :class="[checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm']"
                            >
                                {{ delivery.description }}
                            </RadioGroupDescription>
                        </div>
                    </div>

                    <RadioGroupDescription class="ml-6 pl-1 text-sm text-right self-center text-indigo-900 font-medium"
                        >{{ delivery.price }} Kč</RadioGroupDescription
                    >
                </div>
            </RadioGroupOption>
        </div>
    </RadioGroup>
</template>
