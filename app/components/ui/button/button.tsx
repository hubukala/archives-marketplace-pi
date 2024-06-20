import * as S from "./style";

export interface ButtonProps {
    variant: "primary" | "secondary";
    label: String;
    type?: "button" | "reset" | "submit" | undefined;
    onClick?: () => void;
}

const Button = ({ variant = "primary", label, type, onClick }: ButtonProps) => {
    return (
        <S.Button variant={variant} onClick={onClick} type={type ?? "submit"}>
            {label}
        </S.Button>
    );
};

export default Button;
