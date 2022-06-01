import { useState } from "react";
import { useQuery } from "react-query";
//components
import { Drawer, LinearProgress, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";
//styles
import { Wrapper, StyledButton } from "./App.style";
import { CartItemType } from "./interfaces/CartItemType";
import { ProductListType } from "./interfaces/ProductListType";
import { ShoppingCartService } from "./services/shoppingCartService";



const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const service = new ShoppingCartService();

  const { data, isLoading, error } = useQuery<ProductListType>('products', service.getProducts);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ackm: number, item) => ackm + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
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
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>

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
        {data?.products?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>

  );

}

export default App;
