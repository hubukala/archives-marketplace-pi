import styled from "styled-components";
import Image from "next/image";

const HomeSection = styled.div`
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
`;

const ImageFullScreen = styled(Image)`
    width: 100%;
    height: 100%;
`;

export { HomeSection, ImageFullScreen };
