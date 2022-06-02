import { Wrapper } from "./Cart.style";
import CartItem from '../CartItem/CartItem';
import { useQuery } from "react-query";
import { IOrder } from "../../interfaces/IOrder";
import { ICartItemType } from "../../interfaces/ICartItemType";
import { ShoppingCartService } from "../../services/shoppingCartService";
import { Button, LinearProgress } from "@mui/material";
import CountryList from "../Country/Country";
import { useEffect, useState } from "react";
import { CountryListService } from "../../services/countryListService";
import { CurrencyConversionService } from "../../services/currencyConversionService";
import Configuration from "../../Configuration";
import { useNavigate } from 'react-router-dom';

interface CartProps {
    cartItems: ICartItemType[];
    addToCart: (clickedItem: ICartItemType) => void;
    removeFromCart: (id: number) => void;

};

const service = new ShoppingCartService();
const countryListService = new CountryListService();
const currencyConversionService = new CurrencyConversionService();
const config = new Configuration();
const countries = countryListService.getCountryList();

const Cart = ({ cartItems, addToCart, removeFromCart }: CartProps) => {
    const navigate = useNavigate();
    const checkoutHandler = (order: IOrder) =>{ 
        service.createOrder(order);
        
        navigate('/thankyou')
    };

    const [selectedCurrency, setCurrency] = useState(config.BASE_CURRENCY);

    const [selectedCountry, setSelCountry] = useState(countries[0].id);

    const [amount, setAmount] = useState(0);

    const [currencyConversionFactor, setCurrencyConversionFactor] = useState(0);

    const totalCost = cartItems.reduce((accum, current) => {
        return (accum + (current.amount * current.price))
    }, 0)


    const { data: shippingCostData, isLoading: shippingCostLoading, error: shippingCostError } 
    = useQuery<number>('shippingcost', () => service.getShippingCost(totalCost));

    useEffect(() => {

        const fetchData = async () => {
            const currencyAmt = await currencyConversionService.convert(config.BASE_CURRENCY, selectedCurrency);
            setCurrencyConversionFactor(currencyAmt.result)
        }
        fetchData();

    }, [selectedCurrency]);


    if (shippingCostLoading) return <div><LinearProgress /></div>;

    if (shippingCostError) return <div>error while calculating shipping cost</div>;

    const HandleOnCountryChange = (e: number) => {

        setSelCountry(e);

        const country = countries.find(s => s.id === e)
        if (country) {
            setCurrency(country.currencyCode);
        }
    }
    const order = {
        products: cartItems,
        shippingCost: shippingCostData ? shippingCostData * currencyConversionFactor : 0,
        itemCost: totalCost * currencyConversionFactor
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
                    Select Country <CountryList countries={countries} handleOnCountryChange={e => HandleOnCountryChange(e)}></CountryList>
                </div>
                <div>
                    <p>Item Cost: {selectedCurrency} {order.itemCost.toFixed(2)} </p>
                    <p>Shipping Cost: {selectedCurrency} {order.shippingCost.toFixed(2)}</p>
                    <p>Total Basket Cost: {selectedCurrency} {(order.itemCost + order.shippingCost).toFixed(2)}</p>
                </div>
                <Button onClick={() => checkoutHandler(order)}>
                    Place Order
                </Button>
            </div>
        </Wrapper >
    )
};

export default Cart;

