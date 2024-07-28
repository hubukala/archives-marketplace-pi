import styled from "styled-components";
import Image from "next/image";
import { Archivo_Black } from "@next/font/google";

const ArchivoBlack = Archivo_Black({
    weight: "400",
    subsets: ["latin"],
});

const HomeSection = styled.div`
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
`;

const ImageFullScreen = styled(Image)`
    width: 100%;
    height: 100%;
`;

const RecentlyPostedWrapper = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
`;

const BannerOne = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 20px;
    height: 200px;
    width: 500px;
    padding: 20px;
    background-color: #263d8b;
    color: #e32226;
    font-size: 36px;
    font-family: ${ArchivoBlack.style.fontFamily};
`;

const BannerTwo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 20px;
    height: 200px;
    width: 500px;
    padding: 16px;
    color: #263d8b;
    border: 5px solid #e32226;
    font-size: 36px;
    font-family: ${ArchivoBlack.style.fontFamily};

    &:hover {
        color: #4869d8;
        cursor: pointer;
        border: 5px solid #fa6063;
    }
`;

const BannersContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
`;

export {
    HomeSection,
    ImageFullScreen,
    RecentlyPostedWrapper,
    BannerOne,
    BannerTwo,
    BannersContainer,
};
