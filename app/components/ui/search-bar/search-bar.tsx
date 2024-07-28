import { SearchBarWrapper, SearchInput } from "./style";
import Button from "../button/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const [currentInputField, setInputField] = useState("");
    const router = useRouter();

    const SearchBarClick = (inputId: string) => {
        setInputField("");
        router.push(`/shop/search/${inputId}`);
    };

    const SearchBarInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputField(e.target.value);
    };
    return (
        <SearchBarWrapper>
            <SearchInput
                type="text"
                placeholder="Search by designer or brand"
                value={currentInputField}
                onChange={SearchBarInfo}
            />
            <Button
                onClick={() => SearchBarClick(currentInputField)}
                type="submit"
                variant="primary"
                label="SEARCH"
            />
        </SearchBarWrapper>
    );
};

export default SearchBar;
