import { NextApiResponse } from "next";
import { customInitApp } from "@/lib/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

customInitApp();

export async function GET(req: NextRequest, res: NextApiResponse) {
    const auth = getAuth();

    try {
        const token = req?.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;
        const userDoc = await getDoc(doc(db, "users", uid));

        if (!userDoc.exists()) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(userDoc.data());
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error fetching user data:", err },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
    const auth = getAuth();

    try {
        const token = req?.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;
        const userData = await req.json();

        await setDoc(doc(db, "users", uid), userData, {
            merge: true,
        });

        return NextResponse.json(
            { status: 200 },
            { statusText: "User information updated successfully" }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error updating information:", err },
            { status: 500 }
        );
    }
}
