'use client'
import * as S from "../../ui/link/style"
import SearchBar from "../../ui/search-bar/search-bar"
import { NavBarWrapper } from "./style"
import { ButtonsContainer } from "../../ui/button/style"
import Button from "../../ui/button/button"

type NavBarProps = {
    setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type ModalTypes = 'login' | 'register'

const NavBar = ({setLoginModalOpen, setRegisterModalOpen}: NavBarProps) => {
    const handleOpenModal = (modalType: ModalTypes) => {
        if (modalType === 'login') {
            setRegisterModalOpen(false)
            setLoginModalOpen(true)
        } else {
            setLoginModalOpen(false)
            setRegisterModalOpen(true)
        }
    }

    return (
        <NavBarWrapper>
            <S.NavLink href="/">ARCHIVES MARKETPLACE</S.NavLink>
            <SearchBar />
            <S.NavLink href="/sell">SELL</S.NavLink>
            <S.NavLink href="/shop">SHOP</S.NavLink>
            <ButtonsContainer>
                <Button label="LOGIN" variant="primary" onClick={() => handleOpenModal('login')}/>
                <Button label="SIGN UP" variant="secondary" onClick={() => handleOpenModal('register')}/>
            </ButtonsContainer>
        </NavBarWrapper>
    )
}

export default NavBar