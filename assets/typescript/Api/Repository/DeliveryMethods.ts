import Axios from '../../Plugins/Axios';

export type DeliveryMethodsParamsType = {
    countryId: number;
};

export type DeliveryMethodType = {
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
    excludedPaymentMethods: {
        active: boolean;
        description: string;
        id: number;
        name: string;
        params: unknown;
        price: number;
        type: string;
    }[];
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

export type DeliveryMethodsType = DeliveryMethodType[];

export const getDeliveryMethods = async (params: DeliveryMethodsParamsType): Promise<DeliveryMethodsType> => {
    try {
        const { data } = await Axios.post('cart/delivery-methods', params);
        return data.items;
    } catch (err: any) {
        console.error(err);
    }

    return [];
};
