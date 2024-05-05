import styled from "styled-components";

const SearchBarWrapper = styled.fieldset`
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: solid black 1px;
    padding: 2px;
    width: 40vw;
    border-radius: 3px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 2rem;
    border: none;
    text-indent: 0.5rem;
    &:focus {
        outline: none;
    }
`;

export { SearchBarWrapper, SearchInput };