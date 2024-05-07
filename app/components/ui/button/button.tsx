import * as S from "./style"

interface ButtonProps {
    variant: 'primary' | 'secondary',
    label: String
    onClick?: () => void
  }

const Button = ({variant = 'primary', label, onClick}: ButtonProps) => {
    return (
        <S.Button variant={variant} onClick={onClick}>
            {label}
        </S.Button>
    )
}

export default Button