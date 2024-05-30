import { BackgroundContainer, ModalContainer, ModalWrapper } from "./style"

type ModalProps = {
    open: boolean
    children: React.ReactNode
}

const Modal = ({open, children}: ModalProps) => {
    return (
        open ? (
            <BackgroundContainer>
                <ModalContainer>
                    <ModalWrapper>
                        {children}
                    </ModalWrapper>
                </ModalContainer>
            </BackgroundContainer>
        ) : null
    )
}

export default Modal