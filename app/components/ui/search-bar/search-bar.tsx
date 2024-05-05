import { SearchBarWrapper, SearchInput } from "./style";
import Button from "../button/button";

const SearchBar = () => {
    // const [currentInputField, setInputField] = useState('');
    // const navigate = useNavigate();

    // const SearchBarClick = (inputId) => {
    //     navigate(`/shop/search/${inputId}`);
    //     setInputField('');
    // };

    // const SearchBarInfo = (e) => {
    //     setInputField(e.target.value);
    // };
    return (
        <SearchBarWrapper>
            <SearchInput
                type="text"
                placeholder="Search"
                // value={currentInputField}
                // onChange={SearchBarInfo}
            />
            <Button
                // onClick={() => SearchBarClick(currentInputField)}
                // type="submit"
                variant='primary'
                label="SEARCH"
            />
        </SearchBarWrapper>
    );
};

export default SearchBar;