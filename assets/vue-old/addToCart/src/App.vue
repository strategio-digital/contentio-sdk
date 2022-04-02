<script setup lang="ts">
import { useGlobalStore } from '../../store';
import { updateCartItem } from '../../../typescript/Api';

const props = defineProps<{
    productId: number;
}>();

const store = useGlobalStore();

async function handleClick() {
    const quantity = store.cart?.cartItems.find((item) => item.product.id === props.productId)?.quantity;
    const cart = await updateCartItem({
        setup: {
            currencyId: 1,
        },
        guid: store.guid,
        productId: props.productId,
        quantity: quantity ? quantity + 1 : 1,
    });

    if (cart) {
        store.setCart(cart);
    }
}
</script>
