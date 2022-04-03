<script lang="ts">
import { TrashIcon } from '@heroicons/vue/solid';
import { Options, Vue } from 'vue-class-component';
import { ProductType, updateCartItem } from '../../../typescript/Api';
import { RouterFactory } from '../../../typescript/Routes/RouterFactory';
import { store } from '../../Store/CartStore';

@Options({
    components: {
        TrashIcon,
    },
})
export default class Summary extends Vue {
    private store = store;

    private routes = RouterFactory;

    async handleQuantityChange(quantity: number, productId: ProductType['id']) {
        const cart = await updateCartItem({
            setup: {
                currencyId: this.store.currencyId,
            },
            guid: this.store.guid,
            productId: productId,
            quantity: quantity,
        });

        if (cart) {
            this.store.setCart(cart);
        }
    }
}
</script>

<template>
    <!-- Order summary -->
    <div class="mt-10 lg:mt-0">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Položky košíku</h2>

        <div v-if="store.cart?.cartItems" class="bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 class="sr-only">Items in your cart</h3>

            <ul role="list" class="divide-y divide-gray-200">
                <li v-for="item in store.cart?.cartItems" :key="item.id" class="flex py-6 px-4 sm:px-6">
                    <div class="flex-shrink-0">
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg"
                            :alt="item.product.name"
                            class="w-20 rounded-md"
                        />
                    </div>

                    <div class="ml-6 flex-1 flex flex-col">
                        <div class="flex">
                            <div class="min-w-0 flex-1">
                                <h4 class="text-sm">
                                    <a
                                        :href="routes.product_detail(item.product.slug)"
                                        class="font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        {{ item.product.name }}
                                    </a>
                                </h4>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{ item.product.descriptionShort }}
                                </p>
                            </div>

                            <div class="ml-4 flex-shrink-0 flow-root">
                                <button
                                    type="button"
                                    class="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                    @click="() => handleQuantityChange(0, item.product.id)"
                                >
                                    <span class="sr-only">Remove</span>
                                    <TrashIcon class="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div class="flex-1 pt-2 flex items-end justify-between">
                            <p class="mt-1 text-sm font-medium text-gray-900">
                                {{ item.product.prices[0].basicPrice }}
                            </p>

                            <div class="ml-4">
                                <label for="quantity" class="sr-only">Quantity</label>

                                <input
                                    id="quantity"
                                    name="quantity"
                                    :value="item.quantity"
                                    @change="(e) => handleQuantityChange(parseInt(e.target.value), item.product.id)"
                                    class="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1 w-12 text-center"
                                />
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                <div class="flex items-center justify-between">
                    <dt class="text-sm">Subtotal</dt>
                    <dd class="text-sm font-medium text-gray-900">$64.00</dd>
                </div>
                <div class="flex items-center justify-between">
                    <dt class="text-sm">Shipping</dt>
                    <dd class="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div class="flex items-center justify-between">
                    <dt class="text-sm">Taxes</dt>
                    <dd class="text-sm font-medium text-gray-900">$5.52</dd>
                </div>
                <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt class="text-base font-medium">Total</dt>
                    <dd class="text-base font-medium text-gray-900">$75.52</dd>
                </div>
            </dl>

            <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                <slot name="button">
                    <router-link
                        :to="{ name: 'billing-info' }"
                        class="block text-center w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                        Pokračovat v objednávce
                    </router-link>
                </slot>
            </div>
        </div>

        <div v-else class="text-base">V košíku nemáte žádné položky.</div>
    </div>
</template>
