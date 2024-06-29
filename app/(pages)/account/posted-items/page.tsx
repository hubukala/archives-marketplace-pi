"use client";
import { useUserListings } from "@/lib/api/user-listings";
import { ProductsContainer } from "../../shop/_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";

export default function PostedItems() {
    const { listings, isLoading, isError } = useUserListings();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading listings</div>;

    return (
        <ProductsContainer>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ProductsList arr={listings as ProductType[]} />
            )}
            {isError && <p>Failed to fetch products</p>}
        </ProductsContainer>
    );
}
