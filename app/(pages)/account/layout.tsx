"use client";
import { useEffect, useState } from "react";
import {
    AccountWrapper,
    AccountInfoWrapper,
    FileUploadInput,
    Avatar,
    ContentWrapper,
    ContentBox,
} from "./_components/style";
import SideBar from "@/app/components/layout/sidebar/sidebar";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import Loader from "@/app/components/ui/loader/loader";

export default function Account({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [category, setCategory] = useState("/account");
    const { user, loading } = useAuth();

    useEffect(() => {
        router.push(category);
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
                    // ref={fileInputRef}
                    // onChange={(event) => handleAvatarUpload(event)}
                />
                <Avatar
                    width={100}
                    height={100}
                    src={"https://dummyimage.com/600x400/000/fff"}
                    alt="AV"
                    // onClick={handleAvatarClick}
                />{" "}
                <br />
                {user?.fname} {user?.lname}
                <br />
                {user?.email} <br />
            </AccountInfoWrapper>
            <ContentWrapper>
                {/* sidebar */}
                <SideBar
                    sideBarItems={SIDEBAR_ITEMS}
                    setCategory={setCategory}
                />
                <ContentBox>{children}</ContentBox>
            </ContentWrapper>
        </AccountWrapper>
    );
}
