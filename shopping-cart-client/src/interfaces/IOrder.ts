import { ICartItemType } from "./ICartItemType";

export interface IOrder {
    products: ICartItemType[];
    shippingCost: number;
}