import styled from "styled-components";

const BackgroundContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
`;

const ModalContainer = styled.div`
    background-color: #e8e8e8;
    border-radius: 15px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 480px;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -200px;
    min-width: 280px;
`;

const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export { BackgroundContainer, ModalContainer, ModalWrapper };
