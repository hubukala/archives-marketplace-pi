import styled from "styled-components";
import { ErrorMessage } from "formik";
import { Field } from "formik";

const InputStyles = [
    `
  width: auto;
  border: 1px solid grey;
  height: 2.5rem;
  text-indent: 5px;
  border-radius: 5px;
  color: black;
  font-family: 'Helvetica';
`,
];

const InputsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

const Input = styled(Field)`
    ${InputStyles}
`;

const InputError = styled(ErrorMessage)`
    color: red;
    margin-bottom: 1rem;
`;

export { InputStyles, Input, InputsSection, InputError };
