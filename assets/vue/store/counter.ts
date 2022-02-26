import { defineStore } from 'pinia';
import { DeliveryMethodType, PaymentMethodType } from '../../typescript/Api';

type MainStoreType = {
    currencyId: number;
    countryId: number;
    delivery?: DeliveryMethodType;
    payment?: PaymentMethodType;
};

export const useGlobalStore = defineStore({
    id: 'mainStore',
    state: () =>
        ({
            currencyId: 1,
            countryId: 1,
        } as MainStoreType),
    actions: {
        setCurrencyId(currencyId: MainStoreType['currencyId']) {
            this.currencyId = currencyId;
        },
        setCountryId(countryId: MainStoreType['countryId']) {
            this.countryId = countryId;
        },
        setDelivery(delivery: DeliveryMethodType) {
            this.delivery = delivery;
        },
        setPayment(payment: PaymentMethodType) {
            this.payment = payment;
        },
    },
});
