import Axios from '../../Plugins/Axios';
import { PaymentMethodsType } from '../types';

export type PaymentMethodsParamsType = {
    currencyId: number;
};

export const getPaymentMethods = async (params: PaymentMethodsParamsType): Promise<PaymentMethodsType> => {
    try {
        const { data } = await Axios.post('cart/payment-methods', params);
        return data.items;
    } catch (err: any) {
        console.error(err);
    }

    return [];
};
