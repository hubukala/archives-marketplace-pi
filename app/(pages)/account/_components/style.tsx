import Image from "next/image";
import styled from "styled-components";
import { Form } from "formik";

const AccountWrapper = styled.div`
    margin: 2rem;
`;

const AccountInfoWrapper = styled.div`
    display: flex;
    padding: 0 2rem 2rem 2rem;
    border-bottom: 1px solid grey;
`;

const FileUploadInput = styled.input`
    display: none;
`;

const Avatar = styled(Image)`
    border-radius: 50px;
    margin-right: 2rem;
    transition: all 0.3s;
    object-fit: cover;
    &:hover {
        cursor: pointer;
        opacity: 0.4;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
`;

const ContentBox = styled.div`
    margin: 0 2rem 0 2rem;
    padding-top: 2rem;
    width: 100%;
`;

const AccountInfoForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AccountInfoRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const AccountInfoInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    width: 100%;
`;

const AccountInputLabel = styled.label`
    display: block;
    color: #4a4a4a;
    text-indent: 5px;
    font-size: 12px;
    margin-bottom: 5px;
`;

const AccountDetailsFormWrapper = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export {
    AccountWrapper,
    AccountInfoWrapper,
    FileUploadInput,
    Avatar,
    ContentWrapper,
    ContentBox,
    AccountInfoForm,
    AccountInfoRow,
    AccountInfoInputWrapper,
    AccountInputLabel,
    AccountDetailsFormWrapper,
};
