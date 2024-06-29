"use client";
import { HomeSection, ImageFullScreen } from "./components/layout/home/style";
import Image from "../app/assets/68532840.jpeg";

export default function Home() {
    return (
        <HomeSection>
            <ImageFullScreen src={Image} alt="home" />
        </HomeSection>
    );
}
