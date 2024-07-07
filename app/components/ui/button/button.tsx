import * as S from "./style";

export interface ButtonProps {
    variant: "primary" | "secondary";
    label: String;
    type?: "button" | "reset" | "submit" | undefined;
    disabled?: boolean;
    onClick?: () => void;
}

const Button = ({
    variant = "primary",
    label,
    type,
    disabled,
    onClick,
}: ButtonProps) => {
    return (
        <S.Button
            variant={variant}
            onClick={onClick}
            type={type ?? "submit"}
            disabled={disabled}
        >
            {label}
        </S.Button>
    );
};

export default Button;
