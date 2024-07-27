import styled from "styled-components";

interface ButtonProps {
    variant?: "primary" | "secondary" | "alternative";
    type?: "button" | "reset" | "submit" | undefined;
}

const Button = styled.button<ButtonProps>`
    height: 34px;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid #c5c5c5;
    transition: all 0.3s;
    min-width: 70px;

    border-radius: ${(props) => props.variant === "alternative" && "5px"};
    border: ${(props) =>
        props.variant === "alternative"
            ? "1px solid #e32226"
            : "1px solid #c5c5c5"};
    color: ${(props) => {
        if (props.variant === "secondary") {
            return "#ededed";
        } else if (props.variant === "alternative") {
            return "#263d8b";
        }
    }};
    background-color: ${(props) => {
        if (props.variant === "primary") {
            return "white";
        } else if (props.variant === "secondary") {
            return "#212121";
        } else if (props.variant === "alternative") {
            return "#e32226";
        }
    }};

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
