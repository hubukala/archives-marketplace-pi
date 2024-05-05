import Image from 'next/image';
import styled from 'styled-components';

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

export { AccountWrapper, AccountInfoWrapper, FileUploadInput, Avatar, ContentWrapper, ContentBox };