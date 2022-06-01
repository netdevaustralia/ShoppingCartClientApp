import Configuration from "../Configuration";
import { Order } from "../interfaces/Order";
import { ProductListType } from "../interfaces/ProductListType";

export class ShoppingCartService {
    config: Configuration;
    constructor() {
        this.config = new Configuration();

    }

    getProducts = async (): Promise<ProductListType> => {
        const response = await fetch(this.config.SHOPPING_CART_BASEURL + this.config.RESOURCE_PRODUCT)
            .then(resp => {
                if (!resp.ok) {
                    this.handleErrorResponse(resp);
                }
                return resp.json();
            })
            .catch(error => {
                this.handleError(error);
            })

        return response;
    };

    getShippingCost = async (totalCost: number): Promise<number> => {
        const response = await fetch(this.config.SHOPPING_CART_BASEURL + this.config.RESOURCE_BASKET + '/' + this.config.SHOPPING_CART_GETSHIPPINGCOST + `?totalCost=${totalCost}`)
            .then(response => {
                if (!response.ok) {
                    this.handleErrorResponse(response);
                }
                return response.json();
            })
            .catch(error => {
                this.handleError(error);
            })
        return response;
    }

    createOrder = async (order: Order) => {

        const response = await fetch(this.config.SHOPPING_CART_BASEURL + this.config.RESOURCE_BASKET, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(order)
        })
            .then(resp => {
                if (!resp.ok) {
                    this.handleErrorResponse(resp);
                }
                return resp.json();
            })
            .catch(error => {
                this.handleError(error);
            })
        return response;
    }



    handleErrorResponse(response: Response) {
        throw new Error("HTTP error, status = " + response.status);
    }


    handleError(error: { message: any; }) {
        console.log(error.message);
    }



}

export default ShoppingCartService;




