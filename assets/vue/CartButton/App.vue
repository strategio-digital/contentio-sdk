<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
import { updateCartItem } from '../../typescript/Api';
import { store } from '../Store/CartStore';

@Options({})
export default class App extends Vue {
    @Prop({
        required: true,
        type: Number,
    })
    private productId!: number;

    private store = store;

    async handleClick() {
        const quantity = this.store.cart?.cartItems.find((item) => item.product.id === this.productId)?.quantity;
        const cart = await updateCartItem({
            setup: {
                currencyId: this.store.currencyId,
            },
            guid: this.store.guid,
            productId: this.productId,
            quantity: quantity ? quantity + 1 : 1,
        });

        if (cart) {
            this.store.setCart(cart);
        }
    }
}
</script>
