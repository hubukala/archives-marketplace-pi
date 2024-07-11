"use client";
import useProduct from "@/lib/api/product";
import { usePathname } from "next/navigation";
import SellForm from "../../_components/sell-item-form";

export default function Page() {
    const pathname = usePathname();
    const slug = pathname.split("/")[3];
    const { product, isLoading, isError } = useProduct(slug);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <SellForm
            type="edit"
            productInitialValues={product}
            isValuesLoading={isLoading}
        />
    );
}
