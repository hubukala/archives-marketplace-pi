"use client";
import * as S from "../../ui/link/style";
import SearchBar from "../../ui/search-bar/search-bar";
import { NavBarWrapper } from "./style";
import { ButtonsContainer } from "../../ui/button/style";
import Button from "../../ui/button/button";
import useAuth from "@/app/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { notify } from "../../ui/toast-notification/toast-notification";

type NavBarProps = {
    setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ModalTypes = "login" | "register";

const NavBar = ({ setLoginModalOpen, setRegisterModalOpen }: NavBarProps) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("user changed");
    }, [user]);

    const handleOpenModal = (modalType: ModalTypes) => {
        if (modalType === "login") {
            setRegisterModalOpen(false);
            setLoginModalOpen(true);
        } else {
            setLoginModalOpen(false);
            setRegisterModalOpen(true);
        }
    };

    const handleSignOut = async () => {
        try {
            await axios.post("/api/auth/logout");
            await signOut(auth).then(() => {
                notify({
                    type: "success",
                    message: "You have been logget out",
                });
                router.push("/");
            });
        } catch (error) {
            console.error("Logout failed:", error);
            notify({
                type: "error",
                message: "Logout failed",
            });
        }
    };

    return (
        <NavBarWrapper>
            <S.NavLink href="/">ARCHIVES MARKETPLACE</S.NavLink>
            <SearchBar />
            <S.NavLink href="/sell">SELL</S.NavLink>
            <S.NavLink href="/shop">SHOP</S.NavLink>
            <ButtonsContainer>
                {user ? (
                    <>
                        <Button
                            label="ACCOUNT"
                            variant="primary"
                            onClick={() => router.push("/account")}
                        />
                        <Button
                            label="LOG OUT"
                            variant="secondary"
                            onClick={handleSignOut}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            label="LOGIN"
                            variant="primary"
                            onClick={() => handleOpenModal("login")}
                        />
                        <Button
                            label="SIGN UP"
                            variant="secondary"
                            onClick={() => handleOpenModal("register")}
                        />
                    </>
                )}
            </ButtonsContainer>
        </NavBarWrapper>
    );
};

export default NavBar;
