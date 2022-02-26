<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/outline';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useGlobalStore } from '../../../store';

const store = useGlobalStore();

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
];
</script>

<template>
    <Popover class="flow-root text-sm lg:relative" style="z-index: 9999" v-slot="{ close }">
        <div @mouseleave="close">
            <PopoverButton class="group -m-2 p-2 flex items-center" style="outline: none" onmouseenter="this.click()">
                <ShoppingBagIcon
                    class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {{ store.counter }}
                </span>
                <span class="sr-only">items in cart, view bag</span>
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
                    <h2 class="sr-only">Shopping Cart</h2>

                    <form class="max-w-2xl mx-auto px-4">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li v-for="product in products" :key="product.id" class="py-6 flex items-center">
                                <img
                                    :src="product.imageSrc"
                                    :alt="product.imageAlt"
                                    class="flex-none w-16 h-16 rounded-md border border-gray-200"
                                />
                                <div class="ml-4 flex-auto">
                                    <h3 class="font-medium text-gray-900">
                                        <a :href="product.href">{{ product.name }}</a>
                                    </h3>
                                    <p class="text-gray-500">{{ product.color }}</p>
                                </div>
                            </li>
                        </ul>

                        <a
                            href="/kosik"
                            class="inline-block w-full text-center bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Checkout
                        </a>
                    </form>
                </PopoverPanel>
            </transition>
        </div>
    </Popover>
</template>
