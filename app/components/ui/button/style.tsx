import styled from "styled-components";

interface ButtonProps {
    variant?: "primary" | "secondary";
    type?: "button" | "reset" | "submit" | undefined;
}

const Button = styled.button<ButtonProps>`
    height: 34px;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid #c5c5c5;
    transition: all 0.3s;
    min-width: 70px;

    color: ${(props) => props.variant === "secondary" && "#ededed"};
    background-color: ${(props) =>
        props.variant === "secondary" ? "#212121" : "white"};

    &:hover {
        border: 1px solid blue;
        cursor: pointer;

        color: ${(props) => props.variant === "secondary" && "white"};
        background-color: ${(props) =>
            props.variant === "secondary" ? "#3c3c3c" : "e7e7e7"};
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 5px;
`;

export { Button, ButtonsContainer };
