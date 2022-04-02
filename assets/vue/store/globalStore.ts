import { defineStore } from 'pinia';
import { CartType, DeliveryMethodsType, PaymentMethodsType } from '../../typescript/Api';

export type GlobalStoreType = {
    guid: string;
    currencyId: number;
    deliveryCountryId: number;
    deliveryMethods?: DeliveryMethodsType;
    paymentMethods?: PaymentMethodsType;
    cart?: CartType;
};

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: () =>
        ({
            guid: '119d3d80-c3fe-4657-a141-f24aeff069c9',
            currencyId: 1,
            deliveryCountryId: 1,
            deliveryMethods: undefined,
            paymentMethods: undefined,
            cart: undefined,
        } as GlobalStoreType),
    actions: {
        setCurrencyId(currencyId: GlobalStoreType['currencyId']) {
            this.currencyId = currencyId;
        },
        setDeliveryCountryId(deliveryCountryId: GlobalStoreType['deliveryCountryId']) {
            this.deliveryCountryId = deliveryCountryId;
        },
        setDeliveryMethods(delivery: DeliveryMethodsType) {
            this.deliveryMethods = delivery;
        },
        setPaymentMethods(payment: PaymentMethodsType) {
            this.paymentMethods = payment;
        },
        setCart(cart: CartType) {
            this.cart = cart;
        },
    },
    persist: true,
});
