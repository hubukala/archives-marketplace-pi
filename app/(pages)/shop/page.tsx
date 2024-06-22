"use client";
import useSWR from "swr";
import axios from "axios";
import FilterArray from "@/app/utils/filter-array";
import { ProductsContainer } from "./_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const All: React.FC = () => {
    const { data, error, isLoading } = useSWR("/api/products", fetcher);

    if (error) return <div>Failed to load products</div>;
    if (isLoading) return <div>Loading...</div>;

    const FilteredProducts = FilterArray({ cat: "All", arr: data?.products });

    return (
        <ProductsContainer>
            <ProductsList arr={FilteredProducts as ProductType[]} />
        </ProductsContainer>
    );
};

export default All;
