"use client";
import { useEffect, useRef, useState } from "react";
import {
    AccountWrapper,
    AccountInfoWrapper,
    FileUploadInput,
    Avatar,
    ContentWrapper,
    ContentBox,
} from "./_components/style";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase/config";
import SideBar from "@/app/components/layout/sidebar/sidebar";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import Loader from "@/app/components/ui/loader/loader";
import { v4 as uuidv4 } from "uuid";
import { useUserDetails } from "@/lib/api/user-details";

export default function Account({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [category, setCategory] = useState<string | undefined>("/account");
    const { user, loading } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uniqueId = uuidv4();

    const { userDetails, isLoading, isError, mutate, updater } =
        useUserDetails();

    useEffect(() => {
        router.push(category as string);
    }, [category, router]);

    const SIDEBAR_ITEMS = [
        {
            label: "account",
            category: "/account",
        },
        {
            label: "orders",
            category: "/account/orders",
        },
        {
            label: "my items",
            category: "/account/posted-items",
        },
        {
            label: "sold",
            category: "/account/sold",
        },
    ];

    const handleAvatarClick = () => {
        fileInputRef?.current?.click();
    };

    const handleAvatarUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (
            !event.target ||
            !event.target.files ||
            event.target.files.length === 0
        ) {
            return;
        }

        const file = event?.target?.files[0];
        const avatarRef = ref(storage, `avatars/${file.name + uniqueId}`);
        const snapshot = await uploadBytes(avatarRef, file);
        const url = await getDownloadURL(snapshot.ref);

        const formData = {
            avatar: url,
        };

        try {
            await updater("/api/user/details", formData);
            alert("User information updated successfully");
            // mutate();
        } catch (err) {
            console.error("Error updating user information:", err);
            alert("Error updating user information");
        }
    };

    if (loading) {
        return (
            <AccountWrapper>
                <Loader />
            </AccountWrapper>
        );
    }

    return (
        <AccountWrapper>
            <AccountInfoWrapper>
                <FileUploadInput
                    type="file"
                    id="file"
                    name="file"
                    ref={fileInputRef}
                    onChange={(event) => handleAvatarUpload(event)}
                />
                <Avatar
                    width={100}
                    height={100}
                    src={
                        user?.avatar ?? "https://dummyimage.com/600x400/000/fff"
                    }
                    alt="AV"
                    onClick={handleAvatarClick}
                />{" "}
                <br />
                {user?.fname} {user?.lname}
                <br />
                {user?.email} <br />
            </AccountInfoWrapper>
            <ContentWrapper>
                <SideBar
                    sideBarItems={SIDEBAR_ITEMS}
                    setCategory={setCategory}
                />
                <ContentBox>{children}</ContentBox>
            </ContentWrapper>
        </AccountWrapper>
    );
}
