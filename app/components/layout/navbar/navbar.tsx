'use client'
import * as S from "../../ui/link/style"
import SearchBar from "../../ui/search-bar/search-bar"
import { NavBarWrapper } from "./style"
import { ButtonsContainer } from "../../ui/button/style"
import Button from "../../ui/button/button"


const NavBar = () => {
    return (
        <NavBarWrapper>
            <S.NavLink href="/">ARCHIVES MARKETPLACE</S.NavLink>
            <SearchBar />
            <S.NavLink href="/account">SELL</S.NavLink>
            <S.NavLink href="/shop">SHOP</S.NavLink>
            <ButtonsContainer>
                <Button label="LOGIN" variant="primary"/>
                <Button label="SIGN UP" variant="secondary"/>
            </ButtonsContainer>
        </NavBarWrapper>
    )
}

export default NavBar