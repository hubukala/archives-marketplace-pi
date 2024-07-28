"use client";
import { useRouter, usePathname } from "next/navigation";
import {
    LoadingWrapper,
    ProductsContainer,
    ShopWrapper,
} from "../../_components/style";
import { SearchWrapper } from "./_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";
import useProducts from "@/lib/api/products";
import Loader from "@/app/components/ui/loader/loader";

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();

    const slug = pathname.split("/")[3];
    const { products, isLoading, isError } = useProducts("", slug);

    return (
        <SearchWrapper>
            <h2>Search results for &apos;{slug}&apos;</h2>
            <ShopWrapper>
                <ProductsContainer>
                    {isLoading ? (
                        <LoadingWrapper>
                            <Loader />
                        </LoadingWrapper>
                    ) : (
                        <ProductsList
                            arr={products as ProductType[]}
                            message="No products found for this phrase"
                        />
                    )}
                </ProductsContainer>
            </ShopWrapper>
        </SearchWrapper>
    );
}
