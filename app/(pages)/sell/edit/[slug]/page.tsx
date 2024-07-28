"use client";
import useProduct from "@/lib/api/product";
import { usePathname } from "next/navigation";
import SellForm from "../../_components/sell-item-form";
import Loader from "@/app/components/ui/loader/loader";

export default function Edit() {
    const pathname = usePathname();
    const slug = pathname.split("/")[3];
    const { product, isLoading, isError } = useProduct(slug);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <SellForm
            type="edit"
            productInitialValues={product}
            isValuesLoading={isLoading}
        />
    );
}
