'use client'
import { useState } from "react";
import { AccountWrapper, AccountInfoWrapper, FileUploadInput, Avatar, ContentWrapper, ContentBox } from "./_components/style";
import SideBar from "@/app/components/layout/sidebar/sidebar";

export default function Account({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const SIDEBAR_ITEMS = [
        {
            label: 'account',
            route: '/account'
        },
        {
            label: 'messages',
            route: '/account/messages'
        },
        {
            label: 'orders',
            route: '/account/orders'
        },
        {
            label: 'my items',
            route: '/account/posted-items'
        },
    ]

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
                    src={'https://dummyimage.com/600x400/000/fff'}
                    alt="AV"
                    // onClick={handleAvatarClick}
                />{' '}
                <br />
                email adress <br />
                Joined in:{' '}
                account created date
            </AccountInfoWrapper>
        <ContentWrapper>
            {/* sidebar */}
            <SideBar
                sideBarItems={SIDEBAR_ITEMS}
            />
            <ContentBox>{children}</ContentBox>
        </ContentWrapper>
    </AccountWrapper>
    );
  }