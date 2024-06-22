"use client";
import { useEffect, useState } from "react";
// import { db, storage } from '../firebaseConfig';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { auth } from '../firebaseConfig';
// import { uuidv4 } from '@firebase/util';
import { useFormik } from "formik";
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
import { Dropdown } from "@/app/components/ui/dropdown/style";
import { TextArea } from "@/app/components/ui/text-area/style";
import { FormContainer, PostItemForm } from "./style";
import Button from "@/app/components/ui/button/button";
import Image from "next/image";

const SellForm = () => {
    // const productsRef = collection(db, 'products');
    // const uniqueId = uuidv4();
    const [successMessage, setSuccessMessage] = useState(false);

    const [filesPreview, setFilesPreview] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    // useEffect(() => {
    //     if (
    //         imageUpload.length !== 0 &&
    //         imageUrls.length === imageUpload.length
    //     ) {
    //         setDoc(doc(productsRef, uniqueId), {
    //             user_id: auth.currentUser.uid,
    //             product_id: uniqueId,
    //             available: true,
    //             title: formik.values.itemTitle.toLocaleUpperCase(),
    //             description: formik.values.description,
    //             size: formik.values.size,
    //             color: formik.values.color,
    //             designer: formik.values.designer,
    //             category: formik.values.category,
    //             condition: formik.values.condition,
    //             price: formik.values.price,
    //             images: imageUrls,
    //         });
    //         setSuccessMessage(true);
    //     } else {
    //         console.log('imageurls empty');
    //     }
    // }, [imageUrls]);

    // const uploadFile = () => {
    //     imageUpload.map((el) => {
    //         const imageRef = ref(storage, `products/${el.name + uniqueId}`);
    //         uploadBytes(imageRef, el).then((snapshot) => {
    //             getDownloadURL(snapshot.ref).then((url) => {
    //                 setImageUrls((prev) => [...prev, url]);
    //             });
    //         });
    //     });
    // };

    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema: Yup.object({
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
            // file: Yup.mixed().required('Please upload at least one image'),
        }),
        onSubmit: async (values) => {
            // uploadFile();
        },
    });

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
            <form onSubmit={formik.handleSubmit}>
                <InputsSection>
                    <h3>ITEM DETAILS</h3>
                    <Dropdown
                        type="text"
                        name="category"
                        placeholder="Category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                    >
                        <option value="" disabled hidden selected>
                            Select category
                        </option>
                        <option value="tops">TOPS</option>
                        <option value="bottoms">BOTTOMS</option>
                        <option value="sneakers">SNEAKERS</option>
                        <option value="accessories">ACCESSORIES</option>
                    </Dropdown>
                    {formik.touched.category && formik.errors.category ? (
                        <InputError>{formik.errors.category}</InputError>
                    ) : null}
                    <Input
                        type="text"
                        name="designer"
                        placeholder="Designer"
                        onChange={formik.handleChange}
                        value={formik.values.designer}
                    />
                    {formik.touched.designer && formik.errors.designer ? (
                        <InputError>{formik.errors.designer}</InputError>
                    ) : null}
                    <Input
                        type="text"
                        name="size"
                        placeholder="Size on tag"
                        onChange={formik.handleChange}
                        value={formik.values.size}
                    />
                    {formik.touched.size && formik.errors.size ? (
                        <InputError>{formik.errors.size}</InputError>
                    ) : null}
                    <Input
                        type="text"
                        name="itemTitle"
                        placeholder="Item title"
                        onChange={formik.handleChange}
                        value={formik.values.itemTitle}
                    />
                    {formik.touched.itemTitle && formik.errors.itemTitle ? (
                        <InputError>{formik.errors.itemTitle}</InputError>
                    ) : null}
                </InputsSection>
                <InputsSection>
                    <h3>COLOR</h3>
                    <Input
                        type="text"
                        name="color"
                        placeholder="Exmaple: 'Light Grey'"
                        onChange={formik.handleChange}
                        value={formik.values.color}
                    />
                    {formik.touched.color && formik.errors.color ? (
                        <InputError>{formik.errors.color}</InputError>
                    ) : null}
                </InputsSection>
                <InputsSection>
                    <h3>CONDITION</h3>
                    <Dropdown
                        name="condition"
                        id="condition"
                        onChange={formik.handleChange}
                        value={formik.values.condition}
                    >
                        <option value="" disabled hidden selected>
                            Select condition
                        </option>
                        <option value="brand-new">NEW WITH TAGS</option>
                        <option value="new-no-tags">NEW WITHOUT TAGS</option>
                        <option value="used">PRE-OWNED</option>
                    </Dropdown>
                    {formik.touched.condition && formik.errors.condition ? (
                        <InputError>{formik.errors.condition}</InputError>
                    ) : null}
                </InputsSection>
                <InputsSection>
                    <h3>DESCRIPTION</h3>
                    <TextArea
                        type="text"
                        name="description"
                        placeholder="Details about condition, garment fit and other informations that might be important for the buyer."
                        onChange={formik.handleChange}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <InputError>{formik.errors.description}</InputError>
                    ) : null}
                </InputsSection>
                <InputsSection>
                    <h3>PRICE</h3>
                    <Input
                        type="text"
                        name="price"
                        placeholder="Price (USD)"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price ? (
                        <InputError>{formik.errors.price}</InputError>
                    ) : null}
                </InputsSection>
                <InputsSection>
                    <h3>SHIPPING</h3>
                    <Dropdown
                        name="shippingCarrier"
                        id="shipping"
                        onChange={formik.handleChange}
                        value={formik.values.shippingCarrier}
                    >
                        <option value="" disabled selected hidden>
                            Choose carrier
                        </option>
                        <option value="dhl">DHL</option>
                        <option value="fedex">FEDEX</option>
                        <option value="ups">UPS</option>
                    </Dropdown>{" "}
                    <br />
                    {formik.touched.shippingCarrier &&
                    formik.errors.shippingCarrier ? (
                        <InputError>{formik.errors.shippingCarrier}</InputError>
                    ) : null}
                    <Input
                        type="text"
                        name="shippingPrice"
                        placeholder="Shipping cost (USD)"
                        onChange={formik.handleChange}
                        value={formik.values.shippingPrice}
                    />
                    {formik.touched.shippingPrice &&
                    formik.errors.shippingPrice ? (
                        <InputError>{formik.errors.shippingPrice}</InputError>
                    ) : null}
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
                                        onClick={() => handleRemove(index)}
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
                        name="file"
                        multiple
                        onChange={(event) => {
                            handleOnChange(event);
                        }}
                    />
                    SELECT IMAGES
                </FileUploadButton>
                {imageUpload.length < 1 && formik.errors.file ? (
                    <InputError>{formik.errors.file}</InputError>
                ) : null}
                <br />
                <Button variant="primary" label={"POST ITEM"} />
            </form>
            {/* <SuccessPopup
                successMessage={successMessage}
                setSuccessMessage={setSuccessMessage}
                title="Item posted successfully!"
                description="Go to 'My items' tab in your profile page to see your listings."
            /> */}
        </FormContainer>
    );
};

export default SellForm;
