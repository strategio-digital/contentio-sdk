import Axios from '../../Plugins/Axios';
import { DeliveryMethodsType } from '../types';

export type DeliveryMethodsParamsType = {
    countryId: number;
};

export const getDeliveryMethods = async (params: DeliveryMethodsParamsType): Promise<DeliveryMethodsType> => {
    try {
        const { data } = await Axios.post('cart/get-delivery-methods', params);
        return data.items;
    } catch (err: any) {
        console.error(err);
    }

    return [];
};
