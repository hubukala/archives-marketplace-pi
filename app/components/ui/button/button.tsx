import { LoadingWrapper } from "@/app/(pages)/shop/_components/style";
import Loader from "../loader/loader";
import * as S from "./style";

export interface ButtonProps {
    variant: "primary" | "secondary" | "alternative";
    label: String;
    type?: "button" | "reset" | "submit" | undefined;
    disabled?: boolean;
    onClick?: any;
    isLoading?: boolean;
}

const Button = ({
    variant = "primary",
    label,
    type,
    disabled,
    onClick,
    isLoading,
}: ButtonProps) => {
    return (
        <S.Button
            variant={variant}
            onClick={onClick}
            type={type ?? "submit"}
            disabled={disabled}
        >
            {isLoading ? (
                <LoadingWrapper>
                    <Loader size={"small"} />
                </LoadingWrapper>
            ) : (
                label
            )}
        </S.Button>
    );
};

export default Button;
