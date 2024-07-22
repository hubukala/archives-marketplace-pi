"use client";
import { useUserOrders } from "@/lib/api/user-orders";
import { ProductsContainer } from "../../shop/_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";
import Loader from "@/app/components/ui/loader/loader";

export default function Orders() {
    const { listings, isLoading, isError } = useUserOrders();

    return (
        <ProductsContainer>
            {isLoading ? (
                <Loader />
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
