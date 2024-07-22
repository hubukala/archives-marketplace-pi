"use client";
import Loader from "@/app/components/ui/loader/loader";
import { LoadingWrapper } from "./_components/style";

export default function Loading() {
    return (
        <LoadingWrapper>
            <Loader />
        </LoadingWrapper>
    );
}
