import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { customInitApp } from "@/lib/firebase/admin";

customInitApp();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        console.log(`Attempting to log in user: ${email}`);

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();

        console.log(`Successfully logged in user: ${user.uid}`);

        const response = NextResponse.json({
            user: { uid: user.uid, email: user.email },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/",
        });

        console.log("Token set in cookie");
        return response;
    } catch (error) {
        console.error("Error logging in user:", error);
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
