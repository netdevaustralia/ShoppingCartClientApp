import { Button } from "@mui/material";
import {ICartItemType}  from "../../interfaces/ICartItemType";

//Styles
import { Wrapper } from "./Item.styles";

type Props = {
    item: ICartItemType;
    handleAddToCart: (clickedItem: ICartItemType) => void;
}

const Item = ({ item, handleAddToCart }: Props) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
);

export default Item;