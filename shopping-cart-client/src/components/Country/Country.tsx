import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { AnyStyledComponent } from "styled-components";
import { Country } from "../../interfaces/Country";
import { CountryListService } from "../../services/countryListService";

import Item from "../Item/Item";
import { Wrapper } from "./Country.style";



interface CountryListProps {
    handleOnCountryChange: (clickedCountry: Country) => void
};




const service = new CountryListService();
const countries = service.getCountryList();



const CountryList = (props:any) => {
    const [selectedCountry, setCountry] = useState(countries[0]);
    const handlChange=(e: any)=>{
        setCountry(e.target.value);
        props.onChange(selectedCountry);
    }
    <Wrapper>
        <select value={selectedCountry.id} onChange={handlChange}>
            {countries.map(Item => (
                <option
                    key={Item.id}
                    value={Item.currencyCode}
                >
                    {Item.name}
                </option>

            ))}
        </select>

    </Wrapper>

};

export default CountryList;

