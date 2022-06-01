import { CartItemType } from "./CartItemType";

export interface Order {
    products: CartItemType[];
    shippingCost: number;
}