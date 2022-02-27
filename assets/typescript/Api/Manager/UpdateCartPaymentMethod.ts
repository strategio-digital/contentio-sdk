import Axios from '../../Plugins/Axios';
import { CartType, PaymentMethodType } from '../types';

export type UpdateCartPaymentMethodParamsType = {
    cartGuid: string;
    paymentMethodId: PaymentMethodType['id'];
};

export const updateCartPaymentMethod = async (params: UpdateCartPaymentMethodParamsType): Promise<CartType | null> => {
    try {
        const { data } = await Axios.post('cart/update-payment-method', params);
        return data.cart;
    } catch (err: any) {
        console.error(err);
    }

    return null;
};
