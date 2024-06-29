"use client";
import { useUserOrders } from "@/lib/api/user-orders";
import { ProductsContainer } from "../../shop/_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";

export default function Orders() {
    const { listings, isLoading, isError } = useUserOrders();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading listings</div>;

    return (
        <ProductsContainer>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ProductsList
                    arr={listings as ProductType[]}
                    message="No orders found"
                />
            )}
            {isError && <p>Failed to fetch products</p>}
        </ProductsContainer>
    );
}
