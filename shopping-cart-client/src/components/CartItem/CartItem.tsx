import Button from '@mui/material/Button/Button';
import { ICartItemType } from "../../interfaces/ICartItemType";
import { Wrapper } from './CartItem.style';

interface CartItemProps {
    item: ICartItemType;
    addToCart: (clickedItem: ICartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItem = ({ item, addToCart, removeFromCart }: CartItemProps) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className='information' >
                <p>Price: ${item.price} {item.currency}</p>
                <p>Quantity: {item.amount}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className='button'>
                <Button variant="contained" size="small"  onClick={() => removeFromCart(item.id)}>
                    -
                </Button>
                <p>{item.amount}</p>
                <Button variant="contained" size="small"  onClick={() => addToCart(item)}>
                    +
                </Button>
            </div>
        </div>

        <img src={item.image} alt={item.title} />
    </Wrapper>

)

export default CartItem;