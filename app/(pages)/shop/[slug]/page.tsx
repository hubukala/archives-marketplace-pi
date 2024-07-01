"use client";
import { usePathname } from "next/navigation";

export default function Page() {
    const pathname = usePathname();
    const slug = pathname.split("/")[2];

    return <div>product details page slug: {slug}</div>;
}
