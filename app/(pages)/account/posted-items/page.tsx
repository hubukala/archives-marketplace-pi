"use client";
import { useUserListings } from "@/lib/api/user-listings";
import {
    LoadingWrapper,
    ProductsContainer,
} from "../../shop/_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";
import Loader from "@/app/components/ui/loader/loader";

export default function PostedItems() {
    const { listings, isLoading, isError } = useUserListings();

    return (
        <ProductsContainer>
            {isLoading ? (
                <LoadingWrapper>
                    <Loader />
                </LoadingWrapper>
            ) : (
                <ProductsList
                    arr={listings as ProductType[]}
                    message="You don't have items listed for sale"
                />
            )}
            {isError && <p>Failed to fetch products</p>}
        </ProductsContainer>
    );
}
