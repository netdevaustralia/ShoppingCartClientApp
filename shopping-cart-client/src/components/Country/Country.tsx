import { ICountry } from "../../interfaces/ICountry";
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

