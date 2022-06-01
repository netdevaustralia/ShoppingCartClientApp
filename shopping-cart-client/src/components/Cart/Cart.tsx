//style
import { Wrapper } from "./Cart.style";

import CartItem from '../CartItem/CartItem';
import { useQuery } from "react-query";
import { Navigate } from 'react-router-dom';
import { Order } from "../../interfaces/Order";
import { CartItemType } from "../../interfaces/CartItemType";
import { ShoppingCartService } from "../../services/shoppingCartService";

import { Button } from "@mui/material";
import CountryList from "../Country/Country";
import { Country } from "../../interfaces/Country";
import { useState } from "react";


interface CartProps {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;

};

const service = new ShoppingCartService();

const checkoutHandler = (order: Order) => service.createOrder(order);


const Cart = ({ cartItems, addToCart, removeFromCart }: CartProps) => {

    const service = new ShoppingCartService();

    //const [selCountry,setSelCountry]=useState();

    const handleOnCountryChange = () => {
       console.log(selectedCountry);
    }
    const totalCost = cartItems.reduce((accum, current) => {
        return (accum + (current.amount * current.price))
    }, 0)

    const { data, isLoading, error } = useQuery<number>('shippingcost', () => service.getShippingCost(totalCost));

    const basketCost = data ? totalCost + data : totalCost;

    const order = {
        products: cartItems,
        shippingCost: 10
    }

    return (
        <Wrapper>
            <div>
                <h2>You Shopping Cart</h2>
                {cartItems.length === 0 ? <p>No items in cart</p> : null}
                {cartItems.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />

                ))}
                <div>
                    Select Country <CountryList onChange={handleOnCountryChange}></CountryList>
                </div>
                <div>
                    <p>Total Cost ${totalCost} </p>
                    <p>Shipping Cost {data}</p>
                </div>
                <Button onClick={() => checkoutHandler(order)}>
                    Place Order ${basketCost}
                </Button>
            </div>
        </Wrapper >
    )
};

export default Cart;

