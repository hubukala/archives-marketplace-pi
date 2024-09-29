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
import { usePathname } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import Loader from "@/app/components/ui/loader/loader";
import { v4 as uuidv4 } from "uuid";
import { useUserDetails } from "@/lib/api/user-details";
import { notify } from "@/app/components/ui/toast-notification/toast-notification";

export default function Account({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const [category, setCategory] = useState<string | undefined>(pathname);
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
            mutate("/api/user/details", { ...userDetails, avatar: url }, false);
            await updater("/api/user/details", formData);
            mutate("/api/user/details");
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

    if (loading || isLoading) {
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
                        userDetails?.avatar
                            ? userDetails.avatar
                            : "https://dummyimage.com/600x400/000/fff"
                    }
                    alt="AV"
                    onClick={handleAvatarClick}
                />{" "}
                <br />
                {userDetails?.email} <br />
                {userDetails?.joined ? "Joined in: " : null}
                {userDetails?.joined}
            </AccountInfoWrapper>
            <ContentWrapper>
                <SideBar
                    sideBarItems={SIDEBAR_ITEMS}
                    setCategory={setCategory}
                    category={pathname}
                />
                <ContentBox>{children}</ContentBox>
            </ContentWrapper>
        </AccountWrapper>
    );
}
