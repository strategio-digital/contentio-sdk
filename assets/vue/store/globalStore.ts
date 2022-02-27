import { defineStore } from 'pinia';
import { CartType, DeliveryMethodType, PaymentMethodType } from '../../typescript/Api';

type GlobalStoreType = {
    currencyId: number;
    countryId: number;
    delivery?: DeliveryMethodType;
    payment?: PaymentMethodType;
    cart?: CartType;
};

export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: () =>
        ({
            currencyId: 1,
            countryId: 1,
            delivery: undefined,
            payment: undefined,
            cart: undefined,
        } as GlobalStoreType),
    actions: {
        setCurrencyId(currencyId: GlobalStoreType['currencyId']) {
            this.currencyId = currencyId;
        },
        setCountryId(countryId: GlobalStoreType['countryId']) {
            this.countryId = countryId;
        },
        setDelivery(delivery: DeliveryMethodType) {
            this.delivery = delivery;
        },
        setPayment(payment: PaymentMethodType) {
            this.payment = payment;
        },
        setCart(cart: CartType) {
            this.cart = cart;
        },
    },
    persist: true,
});
