import { sendEmail } from "@/app/utils/send-email";
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

        // disabled for testing email notifications
        // if (uid) {
        //     await setDoc(
        //         doc(db, "products", productId),
        //         {
        //             buyer_id: buyerId,
        //             purchase_date: purchaseDate,
        //             available: false,
        //         },
        //         {
        //             merge: true,
        //         }
        //     );
        // } else {
        //     return NextResponse.json({ error: "Unathorized" }, { status: 401 });
        // }

        const buyerSubject = "Purchase Confirmation";
        // const buyerText = `Thank you for your purchase of ${productName}.`;
        const buyerText = `Thank you for your purchase of (product name).`;
        // const buyerHtml = `<strong>Thank you for your purchase of ${productName}.</strong>`;
        const buyerHtml = `<strong>Thank you for your purchase of (product name).</strong>`;

        const sellerSubject = "Product Sold";
        const sellerText = `Your product (product name) has been sold.`;
        const sellerHtml = `<strong>Your product (product name) has been sold.</strong>`;

        await Promise.all([
            sendEmail({
                to: "buczekzks@gmail.com",
                subject: buyerSubject,
                text: buyerText,
                html: buyerHtml,
            }),
            sendEmail({
                to: "hubertbukala@icloud.com",
                subject: sellerSubject,
                text: sellerText,
                html: sellerHtml,
            }),
        ]);

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
