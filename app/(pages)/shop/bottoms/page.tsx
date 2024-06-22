"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import FilterArray from "@/app/utils/filter-array";
import { ProductsContainer } from "../_components/style";
import ProductsList from "@/app/components/ui/products-list/products-list";
import { ProductType } from "@/types/Product";

export default function Bottoms() {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(
                collection(db, "products"),
                where("available", "==", true)
            );
            const querySnapshot = await getDocs(q);
            const newData: ProductType[] = [];
            querySnapshot.forEach((doc) => {
                newData.push({
                    category: doc.data().category,
                    condition: doc.data().condition,
                    description: doc.data().description,
                    designer: doc.data().designer,
                    image: doc.data().images[0],
                    price: doc.data().price,
                    id: doc.data().product_id,
                    size: doc.data().size,
                    title: doc.data().title,
                });
            });
            setData(newData);
        };
        fetchData();
    }, []);

    const FilteredProducts = FilterArray({
        cat: "bottoms",
        arr: data as ProductType[],
    });

    return (
        <ProductsContainer>
            <ProductsList arr={FilteredProducts as ProductType[]} />
        </ProductsContainer>
    );
}
