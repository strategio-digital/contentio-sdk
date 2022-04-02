<script lang="ts">
import {updateCartItem} from '../../../typescript/Api';
import {Options, Vue, Prop} from "vue-property-decorator";
import {useGlobalStore} from "../../store";

@Options({})
export default class App extends Vue {
    @Prop({
        required: true,
        type: Number,
    })
    private productId!: number;

    private store = useGlobalStore();

    async handleClick() {
        const quantity = this.store.cart?.cartItems.find((item) => item.product.id === this.productId)?.quantity;
        const cart = await updateCartItem({
            setup: {
                currencyId: 1,
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
