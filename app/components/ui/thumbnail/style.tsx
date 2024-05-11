import styled from 'styled-components';
import Image from 'next/image';

const Thumbnail = styled(Image)`
    width: 100%;
    max-width: 150px;
    min-width: 100px;
    height: 200px;
    object-fit: contain;
`;

export { Thumbnail };