import Button from "@/app/components/ui/button/button"
import { Description, RegisterFormWrapper, RegisterInput } from "./style"

type RegisterFormProps = {
    setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterForm = ({setRegisterModalOpen}: RegisterFormProps) => {
    return (
        <RegisterFormWrapper>
            <h1>Sign in</h1>
            <Description>
                Create account to get full access to buying and selling.
            </Description>
            <div>
                Username
            </div>
            <RegisterInput
                type="email"
                name="email"
                onChange={() => console.log('test')}
            />
            <div>
                Password
            </div>
            <RegisterInput
                type="password"
                name="password"
                onChange={() => console.log('test')}
            />
            <p>
                Already have an account? Log in
            </p>
            <div>
                <Button
                    label="LOGIN"
                    variant="primary"
                    onClick={() => console.log('test')}
                />
                <Button
                    label="CLOSE"
                    variant="secondary"
                    onClick={() => setRegisterModalOpen(false)}
                />
            </div>
        </RegisterFormWrapper>
    )
}

export default RegisterForm