"use client";
import {
    LoadingWrapper,
    ProductsContainer,
} from "../../shop/_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";
import Loader from "@/app/components/ui/loader/loader";
import { useUserSold } from "@/lib/api/user-sold";

export default function Sold() {
    const { sold, isLoading, isError } = useUserSold();

    return (
        <ProductsContainer>
            {isLoading ? (
                <LoadingWrapper>
                    <Loader />
                </LoadingWrapper>
            ) : (
                <ProductsList
                    arr={sold as ProductType[]}
                    message="You didn't sold any items"
                />
            )}
            {isError && <p>Failed to fetch products</p>}
        </ProductsContainer>
    );
}
