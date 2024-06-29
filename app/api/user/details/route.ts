import { NextApiRequest, NextApiResponse } from "next";
import { customInitApp } from "@/lib/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { onAuthStateChanged } from "firebase/auth";
import { auth as auth2 } from "@/lib/firebase/config";

customInitApp();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const auth = getAuth();

    try {
        console.log("api token before");
        const token = req?.headers.get("authorization").split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        console.log("api token after");
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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const auth = getAuth();

    try {
        const token = req?.headers.get("authorization").split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;
        // user data bledny format danych
        const userData = await req.json();

        console.log("auth1 uid: ", uid);

        await setDoc(doc(db, "users", uid), userData, { merge: true });

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
