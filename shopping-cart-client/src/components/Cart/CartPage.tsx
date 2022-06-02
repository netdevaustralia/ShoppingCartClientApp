import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, LinearProgress, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import Cart from "../Cart/Cart";
import Item from "../Item/Item";
import { Wrapper } from "./Cart.style";
import { StyledButton } from "../../App.style";
import { ICartItemType } from "../../interfaces/ICartItemType";
import ShoppingCartService from "../../services/shoppingCartService";
import { IProductListType } from "../../interfaces/IProductListType";

const CartPage = () => {
   
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as ICartItemType[]);
    const service = new ShoppingCartService();

    const { data: productListData, isLoading: productListLoading, error: productListError }
        = useQuery<IProductListType>('products', service.getProducts);

    const getTotalItems = (items: ICartItemType[]) =>
        items.reduce((ackm: number, item) => ackm + item.amount, 0);

    const handleAddToCart = (clickedItem: ICartItemType) => {
        setCartItems(prev => {
            const isItemAlreadyInCart = prev.find(item => item.id === clickedItem.id)
            if (isItemAlreadyInCart) {
                return prev.map(item => (

                    item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
                ))
            }
            return [...prev, { ...clickedItem, amount: 1 }];
        })

    };
    const handleRemoveFromCart = (id: number) => null;
    if (productListLoading) return <LinearProgress />;
    if (productListError) return <div>Something went wrong</div>

    return (
        <Wrapper>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                    <AddShoppingCartIcon></AddShoppingCartIcon>
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {productListData?.products?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper >)
};

export default CartPage;