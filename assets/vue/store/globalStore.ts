import { reactive, watch } from 'vue';
import { CartType, DeliveryMethodsType, PaymentMethodsType } from '../../typescript/Api';
import Cookies from '../../typescript/Utils/Cookies';

export type GlobalStoreType = {
    guid: string;
    currencyId: number;
    deliveryCountryId: number;
    deliveryMethods: DeliveryMethodsType;
    paymentMethods: PaymentMethodsType;
    cart?: CartType;
};

type ShopDefaults = {
    guid: string;
    currencyId: number;
    deliveryCountryId: number;
};

let state: GlobalStoreType = {
    guid: '',
    currencyId: 0,
    deliveryCountryId: 0,
    cart: undefined,
    deliveryMethods: [],
    paymentMethods: [],
};

const persistentData = localStorage.getItem('global-store');
if (persistentData) {
    state = JSON.parse(persistentData);
}

const shopDefaultsCookie = Cookies.get('shop_defaults');
const shopDefaults: ShopDefaults | null = shopDefaultsCookie ? JSON.parse(atob(shopDefaultsCookie)) : null;

if (shopDefaults) {
    state.guid = shopDefaults.guid;
    state.currencyId = shopDefaults.currencyId;
    state.deliveryCountryId = shopDefaults.deliveryCountryId;
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
