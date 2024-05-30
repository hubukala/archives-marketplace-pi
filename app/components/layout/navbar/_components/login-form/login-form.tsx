import Button from "@/app/components/ui/button/button"
import { Description, LoginFormWrapper, LoginInput } from "./style"

type LoginFormProps = {
    setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginForm = ({setLoginModalOpen}: LoginFormProps) => {
    return (
        <LoginFormWrapper>
            <h1>Sign in</h1>
            <Description>
                To post your item for sale or make a purchase.
            </Description>
            <div>
                Username
            </div>
            <LoginInput
                type="email"
                name="email"
                onChange={() => console.log('test')}
            />
            <div>
                Password
            </div>
            <LoginInput
                type="password"
                name="password"
                onChange={() => console.log('test')}
            />
            <div>
                <Button
                    label="LOGIN"
                    variant="primary"
                    onClick={() => console.log('test')}
                />
                <Button
                    label="CLOSE"
                    variant="secondary"
                    onClick={() => setLoginModalOpen(false)}
                />
            </div>
        </LoginFormWrapper>
    )
}

export default LoginForm