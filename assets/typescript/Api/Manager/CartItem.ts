import Axios from '../../Plugins/Axios';
import { CartType } from '../types';

export type CartItemParamsType = {
    productId: number;
    quantity: number;
    cartGuid?: string;
};

export const updateCartItem = async (params: CartItemParamsType): Promise<CartType | null> => {
    try {
        const { data } = await Axios.post('cart/item', params);
        return data.cart;
    } catch (err: any) {
        console.error(err);
    }

    return null;
};
