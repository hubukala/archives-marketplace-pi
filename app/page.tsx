"use client";
import {
    BannerOne,
    BannerTwo,
    HomeSection,
    ImageFullScreen,
    RecentlyPostedWrapper,
    BannersContainer,
} from "./components/layout/home/style";
import Hero from "../app/assets/68532840.jpeg";
import {
    LoadingWrapper,
    ProductsContainer,
} from "./(pages)/shop/_components/style";
import Loader from "./components/ui/loader/loader";
import useProducts from "@/lib/api/products";
import { ProductType } from "@/types/Product";
import ProductsList from "./components/ui/products-list/products-list";
import Button from "./components/ui/button/button";
import { useRouter } from "next/navigation";

export default function Home() {
    const { products, isLoading, isError } = useProducts(undefined);
    const router = useRouter();

    return (
        <HomeSection>
            <ImageFullScreen src={Hero} alt="home" />
            <BannersContainer>
                <BannerOne>
                    <span>Sell your premium pieces</span>
                    <Button
                        label={"POST YOUR ITEM"}
                        variant="alternative"
                        onClick={() => router.push(`/sell`)}
                    />
                </BannerOne>
                <BannerTwo onClick={() => router.push(`/shop`)}>
                    Stay fresh, upgrade your wardrobe
                </BannerTwo>
            </BannersContainer>
            <RecentlyPostedWrapper>
                <h1>Recently posted</h1>
            </RecentlyPostedWrapper>
            <ProductsContainer>
                {isLoading ? (
                    <LoadingWrapper>
                        <Loader />
                    </LoadingWrapper>
                ) : (
                    <ProductsList
                        arr={products?.slice(0, 5) as ProductType[]}
                        message="No products found in this category"
                    />
                )}
                {isError && <p>Failed to fetch products</p>}
            </ProductsContainer>
        </HomeSection>
    );
}
