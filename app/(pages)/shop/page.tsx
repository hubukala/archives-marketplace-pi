"use client";
import { ProductsContainer, ShopWrapper } from "./_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";
import useProducts from "@/lib/api/products";
import SideBar from "@/app/components/layout/sidebar/sidebar";
import { useState } from "react";

const All: React.FC = () => {
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
            label: "sneakers",
            category: "footwear",
        },
        {
            label: "accessories",
            category: "accessories",
        },
    ];

    return (
        <ShopWrapper>
            <SideBar sideBarItems={SIDEBAR_ITEMS} setCategory={setCategory} />
            <ProductsContainer>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ProductsList arr={products as ProductType[]} />
                )}
                {isError && <p>Failed to fetch products</p>}
            </ProductsContainer>
        </ShopWrapper>
    );
};

export default All;
