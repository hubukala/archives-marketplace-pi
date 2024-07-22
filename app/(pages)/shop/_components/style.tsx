import styled from "styled-components";

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const ShopWrapper = styled.div`
    display: flex;
`;

const ProductsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
`;

export { LoadingWrapper, ShopWrapper, ProductsContainer };
