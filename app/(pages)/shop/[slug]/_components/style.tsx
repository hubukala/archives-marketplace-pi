import styled from "styled-components";
import { Bakbak_One } from "@next/font/google";

const bakbakOne = Bakbak_One({
    weight: "400",
    subsets: ["latin"],
});

const ProductSection = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 1rem;
    margin: 1rem;
`;

const GallerySection = styled.div`
    margin-bottom: 50px;
    margin-left: 50px;
    margin-right: 50px;
`;

const ProductDescription = styled.div``;

const ProductDetails = styled.p`
    font-size: 12px;
`;

const ProductPrice = styled.p`
    font-size: 22px;
    font-family: ${bakbakOne.style.fontFamily};
`;

const ButtonSection = styled.div`
    display: flex;
    gap: 4px;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ButtonWrapper = styled.span``;

const DeleteProductModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
`;

const DeleteModalButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export {
    ProductSection,
    GallerySection,
    ProductDescription,
    ProductDetails,
    ProductPrice,
    ButtonSection,
    ButtonWrapper,
    DeleteProductModalWrapper,
    DeleteModalButtonsWrapper,
};
