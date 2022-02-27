import { defineStore } from 'pinia';
import { CartType, DeliveryMethodsType, PaymentMethodsType } from '../../typescript/Api';

type GlobalStoreType = {
    currencyId: number;
    countryId: number;
    deliveryMethods?: DeliveryMethodsType;
    paymentMethods?: PaymentMethodsType;
    cart?: CartType;
};

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: () =>
        ({
            currencyId: 1,
            countryId: 1,
            deliveryMethods: undefined,
            paymentMethods: undefined,
            cart: undefined,
        } as GlobalStoreType),
    actions: {
        setCurrencyId(currencyId: GlobalStoreType['currencyId']) {
            this.currencyId = currencyId;
        },
        setCountryId(countryId: GlobalStoreType['countryId']) {
            this.countryId = countryId;
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
