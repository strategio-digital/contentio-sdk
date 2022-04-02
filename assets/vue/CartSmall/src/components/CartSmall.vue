<script lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ShoppingBagIcon } from '@heroicons/vue/outline';
import { Options, Vue } from 'vue-property-decorator';
import { CartType } from '../../../../typescript/Api';
import { RouterFactory } from '../../../../typescript/Routes/RouterFactory';
import { store } from '../../../store';

@Options({
    components: {
        Popover,
        PopoverButton,
        PopoverPanel,
        ShoppingBagIcon,
    },
})
export default class CartSmall extends Vue {
    private store = store;

    private routes = RouterFactory;

    private get items(): CartType['cartItems'] {
        return this.store.cart?.cartItems ?? [];
    }

    private get counter(): number {
        const cartItems = this.store.cart?.cartItems;
        return cartItems?.reduce((total, item) => total + item.quantity, 0) ?? 0;
    }
}
</script>

<template>
    <Popover class="flex text-sm lg:relative" style="z-index: 9999" v-slot="{ close }">
        <div @mouseleave="close" class="flex-1">
            <PopoverButton class="group -m-3 p-3 flex items-center" style="outline: none" onmouseenter="this.click()">
                <ShoppingBagIcon
                    class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span v-if="counter" class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {{ counter }}
                </span>
                <span class="sr-only">položky v nákupním košíku</span>
            </PopoverButton>
            <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <PopoverPanel
                    class="absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
                >
                    <h2 class="sr-only">Nákupní košík</h2>

                    <form v-if="items.length > 0" class="max-w-2xl mx-auto px-4">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li v-for="item in items" :key="item.id" class="py-6 flex items-center">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg"
                                    :alt="item.product.name"
                                    class="flex-none w-16 h-16 rounded-md border border-gray-200"
                                />
                                <div class="ml-4 flex-auto">
                                    <h3 class="font-medium text-gray-900">
                                        <a :href="routes.product_detail(item.product.slug)">{{ item.product.name }}</a>
                                    </h3>
                                </div>
                            </li>
                        </ul>

                        <a
                            :href="routes.cart"
                            class="inline-block w-full text-center bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Objednat zboží
                        </a>
                    </form>

                    <div v-else class="text-base p-6 pb-0 text-center">V košíku nemáte žádné položky.</div>
                </PopoverPanel>
            </transition>
        </div>
    </Popover>
</template>
