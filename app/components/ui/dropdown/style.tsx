import styled from 'styled-components';
import { InputStyles, InputsSection } from '../input/style';

const Dropdown = styled.select(InputStyles);

const InputTextArea = styled.textarea`
    border: 1px solid black;
    height: 10rem;
    border-radius: 5px;
    font-family: 'Helvetica';
    font-style: italic;
`;

export { Dropdown, InputTextArea };