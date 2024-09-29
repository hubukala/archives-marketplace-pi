// app/api/auth/register.ts
import { sendEmail } from "@/app/utils/send-email";
import { auth, db } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    new Date().getFullYear();

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            user_id: user.uid,
            email: user.email,
            joined: new Date().getFullYear(),
        });

        const registerSubject = "Register confirmation";
        const registerText = `Register confirmation`;
        const registerHtml = `
            <div style="width: 100%; margin: 0 auto; max-width: 800px; background-color: #f5f5f5; padding: 40px;">
                <div style="display: block; flex-direction: column; width: 100%; margin: 0 auto; justify-content: center; max-width: 700px; background-color: white; padding: 30px; border-radius: 20px; border: 1px solid #DCDCDC;">
                <p style="font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace; font-weight: bold;">archives marketplace</p>
                <br >
                <p style="font-family: arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 20px; text-align: center;">Your account on archives marketplace platform was created successfully.</p>
                <span style="font-family: arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">You can sign in at: <br> archives-marketplace-pi-j8xd.vercel.app</span><br><br></div>
            </div>
        `;

        await Promise.all([
            sendEmail({
                to: email as string,
                subject: registerSubject,
                text: registerText,
                html: registerHtml,
            }),
        ]);

        return NextResponse.json({
            user: { uid: user.uid, email: user.email },
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
