import { Country } from '../interfaces/Country';

export class CountryListService {
    getCountryList = (): Country[] => {
        return [
            { id: 1, name: "Australia", currencyCode: "AUD" },
            { id: 2, name: "UK", currencyCode: "GBP" },
            { id: 3, name: "NewZealand", currencyCode: "NZD" },
            { id: 4, name: "India", currencyCode: "INR" }]
    }
}