'use client'
import "./globals.css";
import StyledComponentsRegistry from "@/lib/styled-components/registry";
import NavBar from "./components/layout/navbar/navbar";
import Modal from "./components/ui/modal/modal";
import { useState } from "react";
import LoginForm from "./components/layout/navbar/_components/login-form/login-form";
import RegisterForm from "./components/layout/navbar/_components/register-form/register-form";


// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  return (
    <html lang="en">
      <body>        
        <StyledComponentsRegistry>
          <NavBar
            setLoginModalOpen={setLoginModalOpen}
            setRegisterModalOpen={setRegisterModalOpen}
          />
          <main>
            {children}
          </main>
          <Modal open={loginModalOpen}>
            <LoginForm setLoginModalOpen={setLoginModalOpen}/>
          </Modal>
          <Modal open={registerModalOpen}>
            <RegisterForm setRegisterModalOpen={setRegisterModalOpen}/>
          </Modal>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
