import Axios from '../../Plugins/Axios';

export type PaymentMethodsParamsType = {
    currencyId: number;
};

export type PaymentMethodType = {
    active: boolean;
    currency: {
        code: string;
        exchangeRatio: number;
        id: number;
        name: string;
        primary: boolean;
        symbol: string;
        updatedAt: {
            date: string;
            timezone_type: number;
            timezone: string;
        };
    };
    description: string;
    id: number;
    name: string;
    params: unknown;
    price: number;
    tax: {
        description: string;
        id: number;
        percentageZone: number;
        primary: boolean;
        shortcut: string;
    };
    type: string;
};

export type PaymentMethodsType = PaymentMethodType[];

export const getPaymentMethods = async (params: PaymentMethodsParamsType): Promise<PaymentMethodsType> => {
    try {
        const { data } = await Axios.post('cart/payment-methods', params);
        return data.items;
    } catch (err: any) {
        console.error(err);
    }

    return [];
};
