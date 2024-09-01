import { NextApiResponse } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config"; // Adjust the import path according to your project structure
import { getAuth } from "firebase-admin/auth";
import { customInitApp } from "@/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";
import { ProductType } from "@/types/Product";

customInitApp();

export async function GET(req: NextRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const auth = getAuth();

    try {
        const token = req?.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const q = query(
            collection(db, "products"),
            where("buyer_id", "==", uid)
        );

        const querySnapshot = await getDocs(q);
        const products: ProductType[] = [];
        querySnapshot.forEach((doc) => {
            products.push({
                category: doc.data().category,
                condition: doc.data().condition,
                description: doc.data().description,
                designer: doc.data().designer,
                images: doc.data().images[0],
                price: doc.data().price,
                id: doc.data().product_id,
                size: doc.data().size,
                title: doc.data().title,
            });
        });

        return NextResponse.json({ products });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error fetching user data:", err },
            { status: 500 }
        );
    }
}
