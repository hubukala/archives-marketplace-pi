// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-config";
import { ProductType } from '@/types/Product';

export async function GET(req: NextRequest) {
  try {
    const q = query(
      collection(db, 'products'),
      where('available', '==', true)
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
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
