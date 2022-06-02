import { ICountry } from '../interfaces/ICountry';

export class CountryListService {
    getCountryList = (): ICountry[] => {
        return [
            { id: 1, name: "Australia", currencyCode: "AUD" },
            { id: 2, name: "United Kingdom", currencyCode: "GBP" },
            { id: 3, name: "New Zealand", currencyCode: "NZD" },
            { id: 4, name: "India", currencyCode: "INR" }]
    }
}