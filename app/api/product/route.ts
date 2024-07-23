import { NextRequest, NextResponse } from "next/server";
import {
    collection,
    deleteDoc,
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

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("product_id");

    try {
        const q = query(
            collection(db, "products"),
            where("product_id", "==", productId)
        );
        const querySnapshot = await getDocs(q);
        const product: ProductType[] = [];
        querySnapshot.forEach((doc) => {
            product.push({
                category: doc.data().category,
                condition: doc.data().condition,
                description: doc.data().description,
                designer: doc.data().designer,
                image: doc.data().images.map((item: string) => ({
                    original: item,
                    thumbnail: item,
                })),
                price: doc.data().price,
                id: doc.data().product_id,
                size: doc.data().size,
                title: doc.data().title,
                buyer_id: doc.data().buyer_id,
                user_id: doc.data().user_id,
                available: doc.data().available,
                color: doc.data().color,
                shipping_carrier: doc.data().shipping_carrier,
                shipping_price: doc.data().shipping_price,
                iban: doc.data().iban,
                seller: doc.data().seller,
            });
        });

        if (product?.length === 0) {
            return NextResponse.json(
                { error: "Failed to fetch products" },
                { status: 500 }
            );
        }

        return NextResponse.json({ product });
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to fetch products", err },
            { status: 500 }
        );
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const auth = getAuth();

    try {
        const token = req?.headers.get("authorization").split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const {
            productId,
            itemTitle,
            description,
            size,
            color,
            designer,
            category,
            condition,
            price,
            shippingCarrier,
            shippingPrice,
            iban,
        } = await req.json();

        await setDoc(
            doc(db, "products", productId),
            {
                user_id: uid,
                product_id: productId,
                available: true,
                title: itemTitle.toLocaleUpperCase(),
                description,
                size,
                color,
                designer,
                category,
                condition,
                price: parseFloat(price),
                shipping_carrier: shippingCarrier,
                shipping_price: parseFloat(shippingPrice),
                iban,
            },
            {
                merge: true,
            }
        );

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

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const auth = getAuth();

    try {
        const token = req?.headers.get("authorization").split(" ")[1];
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized:" },
                { status: 401 }
            );
        }
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json(
                { error: "Product ID is required:", err },
                { status: 400 }
            );
        }

        await deleteDoc(doc(db, "products", productId));

        return NextResponse.json(
            { status: 200 },
            { statusText: "Product deleted successfully" }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error deleting product:", err },
            { status: 500 }
        );
    }
}
