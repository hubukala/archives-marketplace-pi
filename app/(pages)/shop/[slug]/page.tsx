"use client";
import { usePathname, useRouter } from "next/navigation";
import "react-image-gallery/styles/css/image-gallery.css";
import useProduct from "@/lib/api/product";
import {
    ButtonSection,
    ButtonWrapper,
    DeleteModalButtonsWrapper,
    DeleteProductModalWrapper,
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
import Loader from "@/app/components/ui/loader/loader";
import Modal from "@/app/components/ui/modal/modal";
import { useState } from "react";
import useProductDelete from "@/lib/api/product-delete";

export default function Page() {
    const {
        productDelete,
        loading: loadingDeleteProduct,
        error: errorDeleteProduct,
    } = useProductDelete();
    const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const slug = pathname.split("/")[2];

    const { product, isLoading, isError } = useProduct(slug);
    const { productPurchase, loading, error } = useProductPurchase();

    const uid = auth.currentUser?.uid;

    const handlePurchaseClicked = async () => {
        const payload = {
            productId: product?.id as string,
            purchaseDate: getTodaysDate(),
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

    const handleEditProduct = () => {
        router.push(`/sell/edit/${product?.id}`);
    };

    const handleDeleteProduct = async () => {
        if (product?.id) {
            const result = await productDelete(product?.id);
            if (result) {
                notify({
                    type: "success",
                    message: "Product deleted successfully",
                });
                router.push("/account");
                console.log("Product deleted successfully");
            } else {
                console.log("Failed to update item");
            }
        }
    };

    if (isLoading) {
        return (
            <ProductSection>
                <Loader />
            </ProductSection>
        );
    }

    if (isError) {
        return (
            <ProductSection>
                <p>Product not found</p>
            </ProductSection>
        );
    }

    return (
        <div>
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
                                    onClick={handleEditProduct}
                                />
                                <Button
                                    label="DELETE"
                                    variant="primary"
                                    onClick={() =>
                                        setDeleteProductModalOpen(true)
                                    }
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
            <Modal open={deleteProductModalOpen} height="180px">
                <DeleteProductModalWrapper>
                    <p>Are you sure you want to delete this product?</p>
                    <DeleteModalButtonsWrapper>
                        <Button
                            label="DELETE"
                            variant="primary"
                            onClick={handleDeleteProduct}
                        />
                        <Button
                            label="CLOSE"
                            variant="secondary"
                            onClick={() => setDeleteProductModalOpen(false)}
                        />
                    </DeleteModalButtonsWrapper>
                </DeleteProductModalWrapper>
            </Modal>
        </div>
    );
}
