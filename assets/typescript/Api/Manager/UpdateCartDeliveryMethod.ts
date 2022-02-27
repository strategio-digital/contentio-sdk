import Axios from '../../Plugins/Axios';
import { CartType, DeliveryMethodType } from '../types';

export type UpdateCartDeliveryMethodParamsType = {
    cartGuid: string;
    deliveryMethodId: DeliveryMethodType['id'];
};

export const updateCartDeliveryMethod = async (
    params: UpdateCartDeliveryMethodParamsType,
): Promise<CartType | null> => {
    try {
        const { data } = await Axios.post('cart/update-delivery-method', params);
        return data.cart;
    } catch (err: any) {
        console.error(err);
    }

    return null;
};
