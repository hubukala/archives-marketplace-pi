"use client";
import { usePathname, useRouter } from "next/navigation";
import "react-image-gallery/styles/css/image-gallery.css";
import useProduct from "@/lib/api/product";
import {
    ButtonSection,
    DeleteModalButtonsWrapper,
    DeleteProductModalWrapper,
    GallerySection,
    ProductDescription,
    ProductDetail,
    ProductPrice,
    ProductSection,
    TrackingNumberButtonsWrapper,
    TrackingNumberModalWrapper,
} from "./_components/style";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import Button from "@/app/components/ui/button/button";
import useProductPurchase from "@/lib/api/product-purchase";
import { auth } from "@/lib/firebase/config";
import { notify } from "@/app/components/ui/toast-notification/toast-notification";
import { getTodaysDate } from "@/app/utils/get-todays-date";
import Loader from "@/app/components/ui/loader/loader";
import Modal from "@/app/components/ui/modal/modal";
import { useState } from "react";
import useProductDelete from "@/lib/api/product-delete";
import { Input } from "@/app/components/ui/input/style";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import useProductUpdate from "@/lib/api/product-update";
import useAuth from "@/app/hooks/useAuth";
import { ProductType } from "@/types/Product";

export default function ProductDetails() {
    const { user, loading: userLoading } = useAuth();

    const {
        productDelete,
        loading: loadingDeleteProduct,
        error: errorDeleteProduct,
    } = useProductDelete();
    const {
        productUpdate,
        loading: productUpdateLoading,
        error: productUpdateError,
    } = useProductUpdate();

    const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
    const [trackingNumberModalOpen, setTrackingNumberModalOpen] =
        useState(false);
    const [markAsPaidModalOpen, setMarkAsPaidModalOpen] = useState(false);

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

        const isUserDetailsFilled =
            user?.fname &&
            user?.lname &&
            user?.street &&
            user?.city &&
            user?.zipcode;

        if (isUserDetailsFilled) {
            const result = await productPurchase(payload);
            if (result) {
                notify({
                    type: "success",
                    message: "Purchase completed!",
                });
                console.log("Purchase completed");
                router.push("/account");
            } else {
                notify({
                    type: "error",
                    message:
                        "Please fill your account details before making a purchase",
                });
                console.log("Failed to purchase an item");
            }
        } else {
            notify({
                type: "error",
                message:
                    "You account details are not provided, please go to you account tab and fill your personal informations",
            });
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

    const initialValues = {
        trackingNumber: "",
    };

    const validationSchema = Yup.object({
        trackingNumber: Yup.string().required(
            "Please provide the tracking number"
        ),
    });

    const onSubmit = async (values: ProductType) => {
        const payload = {
            ...values,
            id: product?.id as string,
        };

        const result = await productUpdate(payload);
        if (result) {
            notify({
                type: "success",
                message: "Tracking number added successfully",
            });
            setTrackingNumberModalOpen(false);
        } else {
            console.log("Failed to add the tracking number");
        }
    };

    const markAsPaid = async () => {
        const payload = {
            paid: true,
            id: product?.id as string,
        };

        const result = await productUpdate(payload);
        if (result) {
            notify({
                type: "success",
                message: "Product marked as paid",
            });
            setMarkAsPaidModalOpen(false);
        } else {
            console.log("Failed to mark item as paid");
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

    const showMarkAsPaidButton =
        product?.available === false &&
        product?.buyer_id === uid &&
        !product?.paid;

    const showMarkAsShippedButton =
        product?.available === false &&
        product?.user_id === uid &&
        !product?.tracking_number;

    return (
        <div>
            <ProductSection>
                <GallerySection>
                    <ReactImageGallery
                        items={
                            (product?.images as ReactImageGalleryItem[]) ?? []
                        }
                    />
                    <ProductDescription>
                        <h2>{product?.title}</h2>
                        <ProductDetail>SIZE: {product?.size}</ProductDetail>
                        <ProductDetail>
                            CONDITION: {product?.condition}
                        </ProductDetail>
                        <ProductDetail>{product?.description}</ProductDetail>
                        <ProductPrice>$ {product?.price ?? ""}</ProductPrice>
                        {product?.buyer_id === uid &&
                            product?.paid &&
                            !product.tracking_number && (
                                <>
                                    <h3>
                                        We&apos;ve send a notification to the
                                        seller that you marked the item as paid
                                    </h3>
                                    <p>Your order will be shipped in 3 days.</p>
                                </>
                            )}
                        {product?.buyer_id === uid &&
                            product?.tracking_number && (
                                <>
                                    <h3>
                                        Your order was marked as
                                        &apos;SHIPPED&apos; by the seller
                                    </h3>
                                    <p>
                                        {product?.shipping_carrier} tracking
                                        number: {product?.tracking_number}
                                    </p>
                                </>
                            )}
                        {product?.user_id === uid &&
                            product?.paid &&
                            !product?.tracking_number && (
                                <>
                                    <h3>
                                        Your listing was marked as
                                        &apos;PAID&apos; by the buyer
                                    </h3>
                                    <p>
                                        It is required to ship your item in 3
                                        days since you receive your payment.
                                    </p>
                                </>
                            )}
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
                        ) : product?.user_id === uid &&
                          product?.available === true ? (
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
                        {showMarkAsShippedButton && (
                            <>
                                <Button
                                    label="MARK AS SHIPPED"
                                    variant="primary"
                                    onClick={() =>
                                        setTrackingNumberModalOpen(true)
                                    }
                                />
                            </>
                        )}
                        {showMarkAsPaidButton && (
                            <>
                                <Button
                                    label="MARK AS PAID"
                                    variant="primary"
                                    onClick={() => setMarkAsPaidModalOpen(true)}
                                />
                            </>
                        )}
                    </ButtonSection>
                    {product?.user_id === uid &&
                        product?.available === false && (
                            <>
                                <p>
                                    You can always contact the buyer at:{" "}
                                    {product?.buyer_email}
                                </p>
                                <p>
                                    or send a message to our support team at
                                    support@archives-marketplace.site
                                </p>
                            </>
                        )}
                    {product?.buyer_id === uid &&
                        product?.available === false && (
                            <>
                                <p>
                                    You can always contact the seller at:{" "}
                                    {product?.seller_email}
                                </p>
                                <p>
                                    or send a message to our support team at
                                    support@archives-marketplace.site
                                </p>
                            </>
                        )}
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
            <Modal open={trackingNumberModalOpen} height="180px">
                <TrackingNumberModalWrapper>
                    <span>Enter your tracking number</span>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <Input
                                type="text"
                                name="trackingNumber"
                                placeholder=""
                            />
                            <TrackingNumberButtonsWrapper>
                                <Button
                                    label="SUBMIT"
                                    variant="primary"
                                    type="submit"
                                />
                                <Button
                                    label="CLOSE"
                                    variant="secondary"
                                    onClick={() =>
                                        setTrackingNumberModalOpen(false)
                                    }
                                />
                            </TrackingNumberButtonsWrapper>
                        </Form>
                    </Formik>
                </TrackingNumberModalWrapper>
            </Modal>
            <Modal open={markAsPaidModalOpen} height="180px">
                <DeleteProductModalWrapper>
                    <p>Are you sure you want to mark your purchase as paid?</p>
                    <DeleteModalButtonsWrapper>
                        <Button
                            label="MARK AS PAID"
                            variant="primary"
                            onClick={markAsPaid}
                        />
                        <Button
                            label="CLOSE"
                            variant="secondary"
                            onClick={() => setMarkAsPaidModalOpen(false)}
                        />
                    </DeleteModalButtonsWrapper>
                </DeleteProductModalWrapper>
            </Modal>
        </div>
    );
}
