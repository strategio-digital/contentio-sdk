import { reactive, watch } from 'vue';
import { CartType, DeliveryMethodsType, PaymentMethodsType } from '../../typescript/Api';

export type GlobalStoreType = {
    guid: string;
    currencyId: number;
    deliveryCountryId: number;
    deliveryMethods: DeliveryMethodsType;
    paymentMethods: PaymentMethodsType;
    cart?: CartType;
};

let state: GlobalStoreType = {
    guid: '119d3d80-c3fe-4657-a141-f24aeff069c9',
    currencyId: 1,
    deliveryCountryId: 1,
    cart: undefined,
    deliveryMethods: [],
    paymentMethods: [],
};

const persistentData = localStorage.getItem('global-store');
if (persistentData) {
    state = JSON.parse(persistentData);
}

export const store = reactive({
    ...state,

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
        cart.deliveryMethod = this.deliveryMethods.find((method) => method.id === cart.deliveryMethod?.id);

        const paymentMethod = this.paymentMethods.find((method) => method.id === cart.paymentMethod?.id);

        cart.paymentMethod = cart.deliveryMethod?.excludedPaymentMethods?.some(
            (method) => method.id === paymentMethod?.id,
        )
            ? undefined
            : paymentMethod;

        this.cart = cart;
    },
});

watch(store, (state: GlobalStoreType) => {
    localStorage.setItem('global-store', JSON.stringify(state));
});
