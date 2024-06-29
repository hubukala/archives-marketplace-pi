"use client";
import { useEffect, useState } from "react";
import { TextArea } from "@/app/components/ui/text-area/style";
import { Input } from "@/app/components/ui/input/style";
import { AccountInputLabel } from "./style";
import {
    AccountInfoForm,
    AccountInfoRow,
    AccountInfoInputWrapper,
} from "./style";
import Button from "@/app/components/ui/button/button";
import { useUserDetails } from "@/lib/api/user-details";
import useAuth from "@/app/hooks/useAuth";

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

    const { userDetails, isLoading, isError, mutate, updater } =
        useUserDetails();

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

    const handleInputs = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updater("/api/user/details", formData);
            alert("User information updated successfully");
            mutate(); // Re-fetch the user data to update the local state
        } catch (err) {
            console.error("Error updating user information:", err);
            alert("Error updating user information");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <AccountInfoForm action="">
            <AccountInfoRow>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>First name</AccountInputLabel>
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
                    <TextArea
                        name="bio"
                        type="text"
                        onChange={handleInputs}
                        value={formData?.bio}
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
                    <AccountInputLabel>Street adress</AccountInputLabel>
                    <Input
                        name="street"
                        type="text"
                        onChange={handleInputs}
                        value={formData?.street}
                    />
                </AccountInfoInputWrapper>
                <AccountInfoInputWrapper>
                    <AccountInputLabel>Apt/Suite</AccountInputLabel>
                    <Input
                        name="suite"
                        type="text"
                        onChange={handleInputs}
                        value={formData?.suite}
                    />
                </AccountInfoInputWrapper>
            </AccountInfoRow>
            {/* <ButtonContainer> */}
            <div>
                <Button
                    variant="primary"
                    onClick={(e) => handleUpdate(e)}
                    label="SAVE"
                />
            </div>
            {/* </ButtonContainer> */}
        </AccountInfoForm>
    );
};

export default AccountDetailsForm;
