import Configuration from "../Configuration";

export class CurrencyConversionService {
    config: Configuration
    constructor() {
        this.config = new Configuration();

    }

    convert = async (from: string, to: string, amount: number): Promise<number> => {
        var headers = new Headers();
        headers.append("apikey", this.config.CURRENCY_CONVERSION_APIKEY);
        const response = await fetch(`${this.config.CURRENCY_CONVERSION_URL}?to=${to}&from=${from}&amount=${amount}`, {
            method: 'GET',
            redirect: 'follow',
            headers: headers
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