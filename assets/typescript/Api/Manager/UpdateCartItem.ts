import Axios from '../../Plugins/Axios';
import { CartType } from '../types';

export type UpdateItemParamsType = {
    productId: number;
    quantity: number;
    cartGuid?: string;
};

export const updateCartItem = async (params: UpdateItemParamsType): Promise<CartType | null> => {
    try {
        const { data } = await Axios.post('cart/update-item', params);
        return data.cart;
    } catch (err: any) {
        console.error(err);
    }

    return null;
};
