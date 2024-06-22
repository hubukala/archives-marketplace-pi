import { auth } from "./config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut as FirebaseSignout } from "firebase/auth";

interface SignInProps {
    email: string;
    password: string;
}

export async function signIn({ email, password }: SignInProps) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Signed in successfully");
        })
        .catch((error) => {
            console.log("Failed to sign in", error);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export async function signOut() {
    FirebaseSignout(auth)
        .then(() => {
            console.log("sign out successfull");
        })
        .catch((error) => {
            console.log("error");
        });
}
