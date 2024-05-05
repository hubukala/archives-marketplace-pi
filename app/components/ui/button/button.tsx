import * as S from "./style"

interface ButtonProps {
    variant: 'primary' | 'secondary',
    label: String
  }

const Button = ({variant = 'primary', label}: ButtonProps) => {
    return (
        <S.Button variant={variant}>
            {label}
        </S.Button>
    )
}

export default Button