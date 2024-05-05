import Link from 'next/link';
import styled from 'styled-components';

const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.2s;
    &:hover {
        color: blue;
    }
`;

export { NavLink };