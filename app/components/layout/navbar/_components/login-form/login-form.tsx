import Button from "@/app/components/ui/button/button";
import { Description, LoginFormWrapper, LoginInput } from "./style";
import * as Yup from "yup";
import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { InputError } from "@/app/components/ui/input/style";
import { signIn } from "@/lib/firebase/auth";
import { notify } from "@/app/components/ui/toast-notification/toast-notification";

type LoginFormProps = {
    setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FormValues {
    email: string;
    password: string;
}

const LoginForm = ({ setLoginModalOpen }: LoginFormProps) => {
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
            const response = await axios.post("/api/auth/login", values);
            await signIn({
                email: values.email,
                password: values.password,
            });
            setStatus({ success: true });
            notify({ type: "success", message: "Signed in successfully" });
            setLoginModalOpen(false);
        } catch (err) {
            notify({
                type: "error",
                message: "Please provide correct username and password",
            });
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
        <LoginFormWrapper>
            <h1>Sign in</h1>
            <Description>
                To post your item for sale or make a purchase.
            </Description>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {() => (
                    <Form>
                        <div>E-mail address</div>
                        <LoginInput type="email" id="email" name="email" />
                        <InputError name="email" component="div" />
                        <div>Password</div>
                        <LoginInput
                            type="password"
                            id="password"
                            name="password"
                        />
                        <InputError name="password" component="div" />
                        <div>
                            <Button
                                label="LOGIN"
                                variant="primary"
                                type="submit"
                            />
                            <Button
                                label="CLOSE"
                                variant="secondary"
                                onClick={() => setLoginModalOpen(false)}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </LoginFormWrapper>
    );
};

export default LoginForm;
