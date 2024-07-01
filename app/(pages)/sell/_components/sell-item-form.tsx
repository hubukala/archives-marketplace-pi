"use client";
import { useState } from "react";
// import { db, storage } from '../firebaseConfig';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { auth } from '../firebaseConfig';
import { v4 as uuidv4 } from "uuid";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import SuccessPopup from './SuccessPopup';
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase/config";

const SellForm = () => {
    // const productsRef = collection(db, 'products');
    const uniqueId = uuidv4();
    const { productAdd, loading, error } = useProductAdd();
    const [successMessage, setSuccessMessage] = useState(false);

    const [filesPreview, setFilesPreview] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

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
        category: "",
        designer: "",
        size: "",
        itemTitle: "",
        color: "",
        condition: "",
        description: "",
        price: "",
        shippingCarrier: "",
        shippingPrice: "",
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
    });

    const onSubmit = async (values) => {
        const imageUrls = await uploadFile(imageUpload, uniqueId);

        const payload = {
            ...values,
            images: imageUrls,
        };

        const result = await productAdd(payload);
        if (result) {
            console.log("Product uploaded successfully");
        } else {
            console.log("Failed to upload item");
        }
    };

    const handleOnChange = (event) => {
        const files = event.target.files;
        Array.from(files).map(
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

    return (
        <FormContainer>
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
                            >
                                <option selected value="" disabled hidden>
                                    Select category
                                </option>
                                <option value="tops">TOPS</option>
                                <option value="bottoms">BOTTOMS</option>
                                <option value="sneakers">SNEAKERS</option>
                                <option value="accessories">ACCESSORIES</option>
                            </Field>
                            <InputError name="category" component="div" />
                            <Input
                                type="text"
                                name="designer"
                                placeholder="Designer"
                            />
                            <InputError name="designer" component="div" />
                            <Input
                                type="text"
                                name="size"
                                placeholder="Size on tag"
                            />
                            <InputError name="size" component="div" />
                            <Input
                                type="text"
                                name="itemTitle"
                                placeholder="Item title"
                            />
                            <InputError name="itemTitle" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>COLOR</h3>
                            <Input
                                type="text"
                                name="color"
                                placeholder="Exmaple: 'Light Grey'"
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
                            />
                            <InputError name="description" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>PRICE</h3>
                            <Input
                                type="text"
                                name="price"
                                placeholder="Price (USD)"
                            />
                            <InputError name="price" component="div" />
                        </InputsSection>
                        <InputsSection>
                            <h3>SHIPPING</h3>
                            <Field
                                name="shippingCarrier"
                                className="formik-field"
                                id="shipping"
                                as="select"
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
                            />
                            <InputError name="shippingPrice" component="div" />
                        </InputsSection>
                        <h3>UPLOAD IMAGES</h3>
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
                        <br />
                        <Button
                            variant="primary"
                            label={"POST ITEM"}
                            type="submit"
                            // onClick={formik.handleSubmit}
                        />
                        <button onClick={resetForm}>reset form</button>
                        <p>ERRORS:</p>
                        {JSON.stringify(errors)}
                        <br />
                        <p>VALUES:</p>
                        {JSON.stringify(values)}
                        <p>Image urls </p>
                        {imageUrls}
                    </Form>
                )}
            </Formik>
        </FormContainer>
    );
};

export default SellForm;
