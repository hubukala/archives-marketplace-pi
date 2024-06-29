import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config"; // Adjust the import path according to your project structure
import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { customInitApp } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

customInitApp();

type ProductType = {
    category: string;
    condition: string;
    description: string;
    designer: string;
    image: string;
    price: number;
    id: string;
    size: string;
    title: string;
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
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

        const q = query(
            collection(db, "products"),
            where("user_id", "==", uid)
        );

        const querySnapshot = await getDocs(q);
        const products: ProductType[] = [];
        querySnapshot.forEach((doc) => {
            products.push({
                category: doc.data().category,
                condition: doc.data().condition,
                description: doc.data().description,
                designer: doc.data().designer,
                image: doc.data().images[0],
                price: doc.data().price,
                id: doc.data().product_id,
                size: doc.data().size,
                title: doc.data().title,
            });
        });

        // return NextResponse.json({ message: "test" });
        return NextResponse.json({ products });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error fetching user data:", err },
            { status: 500 }
        );
    }
}
