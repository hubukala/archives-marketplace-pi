import { NextRequest, NextResponse } from "next/server";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ProductType } from "@/types/Product";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    try {
        const q = category
            ? query(
                  collection(db, "products"),
                  where("available", "==", true),
                  where("category", "==", category)
              )
            : query(collection(db, "products"), where("available", "==", true));
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
        return NextResponse.json({ products });
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to fetch products", err },
            { status: 500 }
        );
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const auth = getAuth();
    const token = req?.headers.get("authorization").split(" ")[1];
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uniqueId = uuidv4();

    try {
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const {
            itemTitle,
            description,
            size,
            color,
            designer,
            category,
            condition,
            price,
            images,
            shippingCarrier,
            shippingPrice,
        } = await req.json();

        await setDoc(doc(db, "products", uniqueId), {
            user_id: uid,
            product_id: uniqueId,
            available: true,
            title: itemTitle.toLocaleUpperCase(),
            description,
            size,
            color,
            designer,
            category,
            condition,
            price: parseFloat(price),
            images,
            shippingCarrier,
            shippingPrice: parseFloat(shippingPrice),
        });

        return NextResponse.json(
            { message: "Product uploaded successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.log("catch", err);
        return NextResponse.json(
            { error: "Failed to fetch products", err },
            { status: 500 }
        );
    }
}
