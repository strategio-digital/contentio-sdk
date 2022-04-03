<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ProductType, updateCartItem } from '../../../typescript/Api';
import { RouterFactory } from '../../../typescript/Routes/RouterFactory';
import { store } from '../../Store/CartStore';

@Options({})
export default class Product extends Vue {
    private store = store;

    private routes = RouterFactory;

    private async handleQuantityChange(productId: ProductType['id'], quantity: number) {
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
    <div class="grid gap-y-5">
        <div
            v-if="store.cart?.cartItems.length"
            v-for="cartItem in store.cart?.cartItems"
            :key="cartItem.id"
            :class="['flex flex-wrap', 'items-center border border-gray-200 rounded']"
        >
            <div class="w-1/4 md:w-1/6">
                <img src="https://dummyimage.com/100x100" alt="..." />
            </div>

            <div class="w-3/4 md:w-1/6 p-3">
                <a class="text-indigo-700" :href="routes.product_detail('test')">{{ cartItem.product.name }}</a>
            </div>

            <div class="w-1/2 md:w-1/6 p-3">
                <input
                    :value="cartItem.quantity"
                    @change="(e) => handleQuantityChange(cartItem.product.id, parseInt(e.target.value))"
                    type="number"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 w-24"
                />
            </div>

            <div class="w-1/2 md:w-1/6 p-3">2 430 Kč / ks</div>

            <div class="w-3/4 md:w-3/12 bg-gray-100 md:bg-transparent p-3">
                <div>6 050 Kč</div>
                <div class="text-xs">5 000,00 Kč bez DPH (21%)</div>
            </div>

            <div class="w-1/4 md:w-1/12 text-right bg-gray-100 md:bg-transparent p-3">
                <button
                    class="text-red-600 hover:bg-red-50 transition-colors p-2 rounded-full"
                    @click="handleQuantityChange(cartItem.product.id, 0)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div v-else class="text-base">V košíku nemáte žádné položky.</div>
    </div>

    <div class="text-right mt-10">
        <div class="text-xs">Celkem bez DPH: 57 000,00 Kč</div>
        <div class="text-2xl font-bold">K úhradě: <span class="text-green-600">68 970 Kč</span></div>
    </div>

    <div class="text-right mt-8">
        <router-link
            :to="{ name: 'delivery-and-payment' }"
            class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >
            Pokračovat v objdnávce
        </router-link>
    </div>
</template>
