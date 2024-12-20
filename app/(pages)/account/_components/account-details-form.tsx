"use client";
import { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/input/style";
import { AccountInputLabel } from "./style";
import {
    AccountInfoForm,
    AccountInfoRow,
    AccountInfoInputWrapper,
    AccountDetailsFormWrapper,
} from "./style";
import Button from "@/app/components/ui/button/button";
import { useUserDetails } from "@/lib/api/user-details";
import useAuth from "@/app/hooks/useAuth";
import { Field, Form, Formik } from "formik";
import Loader from "@/app/components/ui/loader/loader";
import { notify } from "@/app/components/ui/toast-notification/toast-notification";

const AccountDetailsForm = () => {
    const { user, loading } = useAuth();

    const [formData, setFormData] = useState({
        avatar: "",
        fname: "",
        lname: "",
        bio: "",
        city: "",
        zipcode: "",
        street: "",
        suite: "",
    });

    const { userDetails, isLoading, updater } = useUserDetails();

    useEffect(() => {
        if (userDetails) {
            setFormData({
                avatar: userDetails.avatar || "",
                fname: userDetails.fname || "",
                lname: userDetails.lname || "",
                bio: userDetails.bio || "",
                city: userDetails.city || "",
                zipcode: userDetails.zipcode || "",
                street: userDetails.street || "",
                suite: userDetails.suite || "",
            });
        }
    }, [userDetails]);

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            await updater("/api/user/details", formData);
            notify({
                type: "success",
                message: "User information updated successfully",
            });
        } catch (err) {
            console.error("Error updating user information:", err);
            notify({
                type: "error",
                message: "Error updating user information",
            });
        }
    };

    const onSubmit = () => {
        console.log("submitted");
    };

    if (loading || isLoading || !userDetails) {
        return (
            <AccountInfoForm>
                <Loader />
            </AccountInfoForm>
        );
    }

    return (
        <AccountInfoForm>
            <Formik initialValues={formData} onSubmit={onSubmit}>
                <Form>
                    <AccountDetailsFormWrapper>
                        <AccountInfoRow>
                            <AccountInfoInputWrapper>
                                <AccountInputLabel>
                                    First name
                                </AccountInputLabel>
                                <Input
                                    name="fname"
                                    type="text"
                                    onChange={handleInputs}
                                    value={formData?.fname}
                                />
                            </AccountInfoInputWrapper>
                            <AccountInfoInputWrapper>
                                <AccountInputLabel>Last name</AccountInputLabel>
                                <Input
                                    name="lname"
                                    type="text"
                                    onChange={handleInputs}
                                    value={formData?.lname}
                                />
                            </AccountInfoInputWrapper>
                        </AccountInfoRow>
                        <AccountInfoRow>
                            <AccountInfoInputWrapper>
                                <AccountInputLabel>Bio</AccountInputLabel>
                                <Field
                                    name="bio"
                                    type="text"
                                    onChange={handleInputs}
                                    value={formData?.bio}
                                    as="textarea"
                                    className="formik-textarea"
                                />
                            </AccountInfoInputWrapper>
                        </AccountInfoRow>
                        <AccountInfoRow>
                            <AccountInfoInputWrapper>
                                <AccountInputLabel>City</AccountInputLabel>
                                <Input
                                    name="city"
                                    type="text"
                                    onChange={handleInputs}
                                    value={formData?.city}
                                />
                            </AccountInfoInputWrapper>
                            <AccountInfoInputWrapper>
                                <AccountInputLabel>ZIP code</AccountInputLabel>
                                <Input
                                    name="zipcode"
                                    type="text"
                                    onChange={handleInputs}
                                    value={formData?.zipcode}
                                />
                            </AccountInfoInputWrapper>
                        </AccountInfoRow>
                        <AccountInfoRow>
                            <AccountInfoInputWrapper>
                                <AccountInputLabel>
                                    Street name
                                </AccountInputLabel>
                                <Input
                                    name="street"
                                    type="text"
                                    onChange={handleInputs}
                                    value={formData?.street}
                                />
                            </AccountInfoInputWrapper>
                            <AccountInfoInputWrapper>
                                <AccountInputLabel>
                                    House number, apt/suite number
                                </AccountInputLabel>
                                <Input
                                    name="suite"
                                    type="text"
                                    onChange={handleInputs}
                                    value={formData?.suite}
                                />
                            </AccountInfoInputWrapper>
                        </AccountInfoRow>
                        <div>
                            <Button
                                variant="primary"
                                onClick={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleUpdate(e)}
                                label="SAVE"
                            />
                        </div>
                    </AccountDetailsFormWrapper>
                </Form>
            </Formik>
        </AccountInfoForm>
    );
};

export default AccountDetailsForm;
