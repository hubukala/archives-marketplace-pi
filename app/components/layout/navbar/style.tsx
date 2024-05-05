import styled from 'styled-components';

const NavBarWrapper = styled.nav`
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-bottom: solid grey 1px;
    background-color: white;
    z-index: 999;
    padding: 0;
`;

export { NavBarWrapper };