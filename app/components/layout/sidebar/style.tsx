import styled from 'styled-components';

const SideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    min-width: 120px;
    max-width: 160px;
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
`;

const SideBarButton = styled.button`
    margin: 5px;
    border: none;
    background-color: white;
    text-align: left;
    font-weight: bold;
    transition: all 0.2s;
    &:hover {
        color: blue;
        cursor: pointer;
    }
`;

export { SideBarWrapper, SideBarButton };