// app/api/auth/register.ts
import { auth, db } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

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
        });

        return NextResponse.json({
            user: { uid: user.uid, email: user.email },
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
