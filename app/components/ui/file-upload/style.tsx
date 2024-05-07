import styled from "styled-components";

const FileUploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 34px;
    width: 110px;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid #c5c5c5;
    background-color: white;
    transition: all 0.3s;
    &:hover {
        cursor: pointer;
        background-color: #e7e7e7;
        border: 1px solid blue;
    }
`;

const FileUploadInput = styled.input`
    display: none;
`;

const FilesPreviewWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
`;

const FilesPreviewElement = styled.div`
    display: flex;
    gap: 5px;
    flex-direction: column;
`;

export {
    FileUploadButton,
    FileUploadInput,
    FilesPreviewWrapper,
    FilesPreviewElement,
};