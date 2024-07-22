import styled, { keyframes } from "styled-components";

const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const l1 = keyframes`
    to {
        transform: rotate(0.5turn);
    }
`;

const LoaderSmall = styled.div`
    width: 10px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid;
    border-color: #000 #0000;
    animation: ${l1} 1s infinite;
`;

const LoaderRegular = styled.div`
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid;
    border-color: #000 #0000;
    animation: ${l1} 1s infinite;
`;

export { LoaderWrapper, LoaderSmall, LoaderRegular };
