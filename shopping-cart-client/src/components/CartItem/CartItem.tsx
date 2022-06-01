import Button from '@mui/material/Button/Button';

//types
import { CartItemType } from "../../interfaces/CartItemType";
import { StyledButton } from '../../App.style';

//style
import { Wrapper } from './CartItem.style';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className='information' >
                <p>Price: ${item.price} {item.currency}</p>
                <p>Quantity: {item.amount}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
        </div>

        <img src={item.image} alt={item.title} />
    </Wrapper>

)

export default CartItem;