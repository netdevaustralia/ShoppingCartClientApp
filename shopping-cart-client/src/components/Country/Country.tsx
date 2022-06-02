import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { AnyStyledComponent } from "styled-components";
import { ICountry } from "../../interfaces/ICountry";
import { CountryListService } from "../../services/countryListService";

import Item from "../Item/Item";
import { Wrapper } from "./Country.style";



interface CountryListProps {
    handleOnCountryChange: (countryId: number) => void;
    countries: ICountry[]
};


const CountryList = ({ handleOnCountryChange, countries }: CountryListProps) => {
    return <Wrapper>
        <select onChange={(e) => handleOnCountryChange(parseInt(e.target.value))}>
            {countries.map(Item => (
                <option
                    key={Item.id}
                    value={Item.id}
                >
                    {Item.name}
                </option>

            ))}
        </select>

    </Wrapper>

};

export default CountryList;

