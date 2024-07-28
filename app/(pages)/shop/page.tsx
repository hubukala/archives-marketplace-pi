"use client";
import { ProductsContainer, ShopWrapper } from "./_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";
import useProducts from "@/lib/api/products";
import SideBar from "@/app/components/layout/sidebar/sidebar";
import { useState } from "react";
import Loader from "@/app/components/ui/loader/loader";
import { LoadingWrapper } from "./_components/style";

export default function Shop() {
    const [category, setCategory] = useState(undefined);
    const { products, isLoading, isError } = useProducts(category);

    const SIDEBAR_ITEMS = [
        {
            label: "all",
            category: undefined,
        },
        {
            label: "tops",
            category: "tops",
        },
        {
            label: "bottoms",
            category: "bottoms",
        },
        {
            label: "footwear",
            category: "footwear",
        },
        {
            label: "accessories",
            category: "accessories",
        },
    ];

    return (
        <ShopWrapper>
            <SideBar
                sideBarItems={SIDEBAR_ITEMS}
                category={category}
                setCategory={setCategory}
            />
            <ProductsContainer>
                {isLoading ? (
                    <LoadingWrapper>
                        <Loader />
                    </LoadingWrapper>
                ) : (
                    <ProductsList
                        arr={products as ProductType[]}
                        message="No products found in this category"
                    />
                )}
                {isError && <p>Failed to fetch products</p>}
            </ProductsContainer>
        </ShopWrapper>
    );
}
