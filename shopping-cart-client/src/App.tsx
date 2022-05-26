import { useState } from "react";
import { useQuery } from "react-query";
//components
import { Drawer, LinearProgress, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import Item from "./components/Item";
//styles
import { Wrapper } from "./App.style";

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

export type ProductListType = {
  products: CartItemType[];
}

const getProducts = async (): Promise<ProductListType> =>
  await (await fetch('https://localhost:7118/api/product')).json();

const App = () => {
  const { data, isLoading, error } = useQuery<ProductListType>('products', getProducts);
  console.log(data);

  const getTotalItems = () => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>

  return (
    <Wrapper>
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
