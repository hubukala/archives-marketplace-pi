"use client";
import { usePathname } from "next/navigation";
import "react-image-gallery/styles/css/image-gallery.css";
import useProduct from "@/lib/api/product";
import {
    ButtonSection,
    ButtonWrapper,
    GallerySection,
    ProductDescription,
    ProductDetails,
    ProductPrice,
    ProductSection,
} from "./_components/style";
import ReactImageGallery from "react-image-gallery";
import Button from "@/app/components/ui/button/button";
import useProductPurchase from "@/lib/api/product-purchase";
import { auth } from "@/lib/firebase/config";
import { notify } from "@/app/components/ui/toast-notification/toast-notification";
import { getTodaysDate } from "@/app/utils/get-todays-date";

export default function Page() {
    const pathname = usePathname();
    const slug = pathname.split("/")[2];
    const { product, isLoading, isError } = useProduct(slug);
    const { productPurchase, loading, error } = useProductPurchase();
    const uid = auth.currentUser?.uid;

    const handlePurchaseClicked = async () => {
        const payload = {
            buyerId: uid as string,
            purchaseDate: getTodaysDate(),
            productId: product?.id as string,
        };

        const result = await productPurchase(payload);
        if (result) {
            notify({
                type: "success",
                message: "Purchase completed!",
            });
            console.log("Purchase completed");
        } else {
            console.log("Failed to purchase an item");
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Failed to fetch product</p>}
            <ProductSection>
                <GallerySection>
                    <ReactImageGallery items={product?.image ?? []} />
                    <ProductDescription>
                        <h2>{product?.title}</h2>
                        <ProductDetails>SIZE: {product?.size}</ProductDetails>
                        <ProductDetails>
                            CONDITION: {product?.condition}
                        </ProductDetails>
                        {/* todo: add seller profile page */}
                        {/* <ProductDetails>SELLER: john</ProductDetails> */}
                        <ProductDetails>{product?.description}</ProductDetails>
                        <ProductPrice>$ {product?.price ?? ""}</ProductPrice>
                    </ProductDescription>
                    <ButtonSection>
                        {product?.buyer_id ? (
                            <>
                                <Button
                                    label="SOLD OUT"
                                    variant="primary"
                                    disabled={true}
                                />
                            </>
                        ) : product?.user_id === uid ? (
                            <>
                                <Button
                                    label="EDIT"
                                    variant="primary"
                                    onClick={() => console.log("edit")}
                                />
                            </>
                        ) : (
                            <>
                                <Button
                                    label="PURCHASE"
                                    variant="primary"
                                    onClick={handlePurchaseClicked}
                                />
                            </>
                        )}
                    </ButtonSection>
                </GallerySection>
            </ProductSection>
        </div>
    );
}
