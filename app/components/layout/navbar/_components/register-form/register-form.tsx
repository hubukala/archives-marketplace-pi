"use client";
import Button from "@/app/components/ui/button/button";
import { Description, RegisterFormWrapper, RegisterInput } from "./style";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import { InputError } from "@/app/components/ui/input/style";

interface FormValues {
    email: string;
    password: string;
}

type RegisterFormProps = {
    setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegisterForm = ({ setRegisterModalOpen }: RegisterFormProps) => {
    const initialValues: FormValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long")
            .required("Field required"),
    });

    const onSubmit = async (
        values: FormValues,
        { setSubmitting, setStatus }: FormikHelpers<FormValues>
    ) => {
        try {
            const response = await axios.post("api/auth/register", values);
            setStatus({ success: true });
            setRegisterModalOpen(false);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setStatus({ error: err.response.data.error });
            } else {
                setStatus({ error: "An unexpected error occurred" });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <RegisterFormWrapper>
            <h1>Sign in</h1>
            <Description>
                Create account to get full access to buying and selling.
            </Description>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {() => (
                    <Form>
                        <div>Username</div>
                        <RegisterInput type="email" id="email" name="email" />
                        <InputError name="email" component="div" />
                        <div>Password</div>
                        <RegisterInput
                            type="password"
                            id="password"
                            name="password"
                        />
                        <InputError name="password" component="div" />
                        <p>Already have an account? Log in</p>
                        <div>
                            <Button
                                label="REGISTER"
                                variant="primary"
                                type="submit"
                            />
                            <Button
                                label="CLOSE"
                                variant="secondary"
                                onClick={() => setRegisterModalOpen(false)}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </RegisterFormWrapper>
    );
};

export default RegisterForm;
