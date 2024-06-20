import styled from "styled-components";
import { Field } from "formik";

const RegisterFormWrapper = styled.div`
    display: block;
    text-align: center;
    margin: auto;
    padding-bottom: 1.5rem;
`;

const Description = styled.p`
    padding: 1rem;
    padding-top: 0;
    margin: 1rem;
    border-bottom: 1px solid black;
    line-height: 1.3rem;
`;

const Label = styled.label`
    padding-bottom: 25px;
`;

const RegisterInput = styled(Field)`
    margin-bottom: 15px;
    margin-top: 5px;
    height: 2rem;
    width: 75%;
`;

export { RegisterFormWrapper, Description, Label, RegisterInput };
