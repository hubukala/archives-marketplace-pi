import { BackgroundContainer, ModalContainer, ModalWrapper } from "./style";

type ModalProps = {
    open: boolean;
    children: React.ReactNode;
    height?: string;
};

const Modal = ({ open, children, height }: ModalProps) => {
    return open ? (
        <BackgroundContainer>
            <ModalContainer height={height}>
                <ModalWrapper>{children}</ModalWrapper>
            </ModalContainer>
        </BackgroundContainer>
    ) : null;
};

export default Modal;
