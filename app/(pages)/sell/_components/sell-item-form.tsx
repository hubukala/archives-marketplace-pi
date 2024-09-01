"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
    FileUploadButton,
    FileUploadInput,
    FilesPreviewWrapper,
    FilesPreviewElement,
} from "@/app/components/ui/file-upload/style";
import {
    Input,
    InputsSection,
    InputError,
} from "@/app/components/ui/input/style";
import { FormContainer } from "./style";
import Button from "@/app/components/ui/button/button";
import Image from "next/image";
import useProductAdd from "@/lib/api/product-add";
import useProductUpdate from "@/lib/api/product-update";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase/config";
import { notify } from "@/app/components/ui/toast-notification/toast-notification";
import Warning from "@/app/components/ui/warning/warning";
import useAuth from "@/app/hooks/useAuth";
import Loader from "@/app/components/ui/loader/loader";
import { ProductType } from "@/types/Product";

type SellFormPropsType = {
    type?: "edit" | "create";
    productInitialValues?: any;
    isValuesLoading?: boolean;
};

const SellForm = ({
    type,
    productInitialValues,
    isValuesLoading,
}: SellFormPropsType) => {
    // const productsRef = collection(db, 'products');
    const { user, loading: userLoading } = useAuth();
    const uniqueId = uuidv4();
    const { productAdd, loading, error } = useProductAdd();
    const {
        productUpdate,
        loading: productUpdateLoading,
        error: productUpdateError,
    } = useProductUpdate();

    const isUserDetailsFilled =
        user?.fname &&
        user?.lname &&
        user?.street &&
        user?.city &&
        user?.zipcode;

    const [filesPreview, setFilesPreview] = useState<string[]>([]);
    const [imageUpload, setImageUpload] = useState<File[]>([]);

    const uploadFile = async (
        imageUpload: File[],
        uniqueId: string
    ): Promise<string[]> => {
        const imageUrls: string[] = [];

        const uploadPromises = imageUpload.map(async (file) => {
            const imageRef = ref(storage, `products/${file.name + uniqueId}`);
            const snapshot = await uploadBytes(imageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            imageUrls.push(url);
        });

        await Promise.all(uploadPromises);

        return imageUrls;
    };

    const initialValues = {
        category: productInitialValues?.category ?? "",
        designer: productInitialValues?.designer ?? "",
        size: productInitialValues?.size ?? "",
        itemTitle: productInitialValues?.title ?? "",
        color: productInitialValues?.color ?? "",
        condition: productInitialValues?.condition ?? "",
        description: productInitialValues?.description ?? "",
        price: productInitialValues?.price ?? "",
        shippingCarrier: productInitialValues?.shipping_carrier ?? "",
        shippingPrice: productInitialValues?.shipping_price ?? "",
        iban: productInitialValues?.iban ?? "",
    };

    const validationSchema = Yup.object({
        category: Yup.string().required("Please select category"),
        designer: Yup.string().required("Designer name is required"),
        size: Yup.string().required("Size is required"),
        itemTitle: Yup.string().required("Item title is required"),
        color: Yup.string().required("Color is required"),
        condition: Yup.string().required("Please select condition"),
        description: Yup.string().required("Description is required"),
        price: Yup.number().required("Price is required"),
        shippingCarrier: Yup.string().required(
            "Please select shipping carrier"
        ),
        shippingPrice: Yup.number().required("Shipping price is required"),
        iban: Yup.string()
            .required("Bank account number is required")
            .min(
                28,
                "Bank account number should contain at least 28 characters"
            ),
    });

    const onSubmit = async (values: ProductType) => {
        if (type === "edit") {
            const payload = {
                ...values,
                id: productInitialValues.id,
            };

            const result = await productUpdate(payload);
            if (result) {
                notify({
                    type: "success",
                    message: "Product updated successfully",
                });
                console.log("Product updated successfully");
            } else {
                console.log("Failed to update item");
            }
        } else {
            const imageUrls = await uploadFile(imageUpload, uniqueId);

            const payload = {
                ...values,
                images: imageUrls,
                sellerEmail: user?.email,
            };

            const result = await productAdd(payload);
            if (result) {
                console.log("Product uploaded successfully");
            } else {
                console.log("Failed to upload item");
            }
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        Array.from(files as ArrayLike<File>).map(
            (el) => (
                setImageUpload((prev) => [...prev, el]),
                setFilesPreview((prev) => [...prev, URL.createObjectURL(el)])
            )
        );
    };

    const handleRemove = (index: Number) => {
        setFilesPreview(filesPreview.filter((o, i) => index !== i));
        setImageUpload(imageUpload.filter((o, i) => index !== i));
    };

    if (isValuesLoading || userLoading) {
        return (
            <FormContainer>
                <Loader />
            </FormContainer>
        );
    }

    return (
        <FormContainer>
            {!isUserDetailsFilled && user && (
                <Warning
                    message="Your account details are not provided yet and you will not be
                    able to post any items for sale. Go to 'ACCOUNT' tab
                    to provide address, first and last names"
                />
            )}
            {!user && (
                <Warning message="Create account or sign in to post items for sale" />
            )}
            <h1>Add a new listing</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ values, errors, resetForm }) => (
                    <Form>
                        <InputsSection>
                            <h3>ITEM DETAILS</h3>
                            <Field
                                type="text"
                                className="formik-field"
                                name="category"
                                placeholder="Category"
                                as="select"
                                disabled={!isUserDetailsFilled}
                            >
                                <option selected value="" disabled hidden>
                                    Select category
                                </option>
                                <option value="tops">TOPS</option>
                                <option value="bottoms">BOTTOMS</option>
                                <option value="footwear">SNEAKERS</option>
                                <option value="accessories">ACCESSORIES</option>
                            </Field>
                            <InputError name="category" component="div" />
                            <Input
                                type="text"
                                name="designer"
                                placeholder="Designer"
                                disabled={!isUserDetailsFilled}
                            />
                            <InputError name="designer" component="div" />
                            <Input
                                type="text"
                                name="size"
                                placeholder="Size on tag"
                                disabled={!isUserDetailsFilled}
                            />
                            <InputError name="size" component="div" />
                            <Input
                                type="text"
                                name="itemTitle"
                                placeholder="Item title"
                                disabled={!isUserDetailsFilled}
                            />
                            <InputError name="itemTitle" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>COLOR</h3>
                            <Input
                                type="text"
                                name="color"
                                placeholder="Exmaple: 'Light Grey'"
                                disabled={!isUserDetailsFilled}
                            />
                            <InputError name="color" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>CONDITION</h3>
                            <Field
                                type="text"
                                className="formik-field"
                                name="condition"
                                id="condition"
                                as="select"
                                disabled={!isUserDetailsFilled}
                            >
                                <option value="" disabled hidden selected>
                                    Select condition
                                </option>
                                <option value="brand-new">NEW WITH TAGS</option>
                                <option value="new-no-tags">
                                    NEW WITHOUT TAGS
                                </option>
                                <option value="used">PRE-OWNED</option>
                            </Field>
                            <InputError name="condition" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>DESCRIPTION</h3>
                            <Field
                                type="text"
                                className="formik-textarea"
                                name="description"
                                placeholder="Details about condition, garment fit and other informations that might be important for the buyer."
                                as="textarea"
                                disabled={!isUserDetailsFilled}
                            />
                            <InputError name="description" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>PRICE</h3>
                            <Input
                                type="text"
                                name="price"
                                placeholder="Price (USD)"
                                disabled={!isUserDetailsFilled}
                            />
                            <InputError name="price" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>SHIPPING</h3>
                            <Field
                                type="text"
                                name="shippingCarrier"
                                className="formik-field"
                                id="shipping"
                                as="select"
                                disabled={!isUserDetailsFilled}
                            >
                                <option value="" disabled selected hidden>
                                    Choose carrier
                                </option>
                                <option value="dhl">DHL</option>
                                <option value="fedex">FEDEX</option>
                                <option value="ups">UPS</option>
                            </Field>{" "}
                            <br />
                            <InputError
                                name="shippingCarrier"
                                component="div"
                            />
                            <Input
                                type="text"
                                name="shippingPrice"
                                placeholder="Shipping cost (USD)"
                                disabled={!isUserDetailsFilled}
                            />
                            <InputError name="shippingPrice" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>PAYMENT</h3>
                            <Input
                                type="text"
                                name="iban"
                                placeholder="Provide your bank account number (IBAN)"
                                disabled={!isUserDetailsFilled}
                            />
                            <InputError name="iban" component="div" />
                        </InputsSection>
                        {isUserDetailsFilled && <h3>UPLOAD IMAGES</h3>}
                        {filesPreview.length > 0 ? (
                            <FilesPreviewWrapper>
                                {filesPreview.map((el, index) => {
                                    return (
                                        <FilesPreviewElement key={index}>
                                            <Image
                                                src={el}
                                                alt={el}
                                                key={index}
                                                width="200"
                                                height="200"
                                            />
                                            <Button
                                                variant="primary"
                                                label="REMOVE IMAGE"
                                                onClick={() =>
                                                    handleRemove(index)
                                                }
                                            />
                                        </FilesPreviewElement>
                                    );
                                })}
                            </FilesPreviewWrapper>
                        ) : null}
                        {isUserDetailsFilled && (
                            <>
                                <FileUploadButton>
                                    <FileUploadInput
                                        type="file"
                                        id="file"
                                        name="images"
                                        multiple
                                        onChange={(event) => {
                                            handleOnChange(event);
                                        }}
                                    />
                                    SELECT IMAGES
                                </FileUploadButton>
                                <InputError name="images" component="div" />
                            </>
                        )}
                        <br />
                        <Button
                            variant="primary"
                            label={"POST ITEM"}
                            type="submit"
                            disabled={!isUserDetailsFilled}
                            // onClick={formik.handleSubmit}
                        />
                    </Form>
                )}
            </Formik>
        </FormContainer>
    );
};

export default SellForm;
