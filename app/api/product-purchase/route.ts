import { db } from "@/lib/firebase/config";
import { getAuth } from "firebase-admin/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const auth = getAuth();

    try {
        const token = req?.headers.get("authorization").split(" ")[1];
        if (!token) {
            return NextResponse.json({ error: "Unathorized" }, { status: 401 });
        }
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const { buyerId, purchaseDate, productId } = await req.json();

        if (uid) {
            await setDoc(
                doc(db, "products", productId),
                {
                    buyer_id: buyerId,
                    purchase_date: purchaseDate,
                    available: false,
                },
                {
                    merge: true,
                }
            );
        } else {
            return NextResponse.json({ error: "Unathorized" }, { status: 401 });
        }

        return NextResponse.json(
            { status: 200 },
            { statusText: "User information updated successfully" }
        );
    } catch (err) {
        return NextResponse.json(
            { error: "Error updating information:", err },
            { status: 500 }
        );
    }
}
