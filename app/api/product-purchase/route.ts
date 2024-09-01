import { sendEmail } from "@/app/utils/send-email";
import { db } from "@/lib/firebase/config";
import { getAuth } from "firebase-admin/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { UserType } from "@/types/User";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const auth = getAuth();

    try {
        const token = req?.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ error: "Unathorized" }, { status: 401 });
        }
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const { productId, purchaseDate } = await req.json();

        const productDocRef = doc(db, "products", productId);
        const productDoc = await getDoc(productDocRef);
        const productData = productDoc.data();

        if (!productData?.available) {
            return NextResponse.json(
                { error: "Error: Item is not avaiable" },
                { status: 500 }
            );
        }

        const sellerRef = productData?.seller;
        const sellerDoc = await getDoc(sellerRef);
        const sellerData = sellerDoc.data() as UserType;

        const buyerRef = doc(db, "users", uid);
        const buyerDoc = await getDoc(buyerRef);
        const buyerData = buyerDoc.data() as UserType;

        if (uid) {
            await setDoc(
                doc(db, "products", productId),
                {
                    buyer_id: uid,
                    buyer_email: buyerData.email,
                    purchase_date: purchaseDate,
                    available: false,
                    buyer: buyerRef,
                },
                {
                    merge: true,
                }
            );
        } else {
            return NextResponse.json({ error: "Unathorized" }, { status: 401 });
        }

        const buyerSubject = "Purchase Confirmation";
        const buyerText = `Thank you for your purchase of ${productData?.title}.`;
        const totalPrice = productData?.price + productData?.shipping_price;
        const buyerHtml = `
            <div style="width: 100%; margin: 0 auto; max-width: 800px; background-color: #F5F5F5; padding: 40px;">
                <div style="display: block; flex-direction: column; width: 100%; margin: 0 auto; justify-content: center; max-width: 700px; background-color: white; padding: 30px; border-radius: 20px; border: 1px solid #DCDCDC;">
                    <p style="font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace; font-weight: 700;">archives marketplace</p>
                    <div style="display: flex; justify-content: center; width: 100px; margin: 0 auto;">
                        <img src="https://fnftejz.stripocdn.email/content/guids/cab_pub_7cbbc409ec990f19c78c75bd1e06f215/images/Check_Mark_Blue2.png" alt="" width="100" class="adapt-img" style="display: block">
                    </div>
                    <h1 style="font-family:arial, 'helvetica neue', helvetica, sans-serif; width: 100%; margin: 0 auto; text-align: center;">Order confirmation</h1>
                    <p style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 20px; text-align: center;">This email is to confirm your order. Please complete your purchase by sending total payment to the bank account listed below. Your order will be sent in 3 days since payment is completed. </p>
                    <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">${sellerData?.fname} ${sellerData?.lname} (${sellerData?.email})</span>
                    <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">${sellerData?.street} ${sellerData?.suite}</span>
                    <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">${sellerData?.zipcode} ${sellerData?.city}</span>
                    <p style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 20px;">${productData?.iban}</p>
                    <div style="border-bottom: 1px solid #DCDCDC; margin-bottom: 20px;"></div>
                    <div style="width: 100%; margin: 0 auto; gap: 20px;">
                      <div style="width: 100px; margin: 0 auto;">
                        <img src="${productData?.images[0]}" alt="product-thumbnail" width="100" style="width: 100px; margin: 0 auto;">
                      </div>
                      <div style="font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace; width: 100%; margin: 0 auto; text-align: center;">
                        ${productData?.title} <br>
                        Color: ${productData?.color} <br>
                        Size: ${productData?.size}
                      </div>
                    </div>
                    <div style="display: flex; gap: 40px; justify-content: center; padding-top: 20px;">
                        <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">Item: </span>
                        <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;"> $${productData?.price}</span>
                    </div>
                    <div style="display: flex; gap: 40px; justify-content: center;">
                        <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">Shipping: </span>
                        <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;"> $${productData?.shipping_price}</span>
                    </div>
                    <div style="display: flex; gap: 40px; justify-content: center;">
                        <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">Total: </span>
                        <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;"> $${totalPrice}</span>
                    </div>
                </div>
            </div>
        `;

        const sellerSubject = "Product Sold";
        const sellerText = `Your product ${productData?.title} has been sold.`;
        const sellerHtml = `
            <div style="width: 100%; margin: 0 auto; max-width: 800px; background-color: #F5F5F5; padding: 40px;">
                <div style="display: block; flex-direction: column; width: 100%; margin: 0 auto; justify-content: center; max-width: 700px; background-color: white; padding: 30px; border-radius: 20px; border: 1px solid #DCDCDC;">
                    <p style="font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace; font-weight: 700;">archives marketplace</p>
                    <div style="display: flex; justify-content: center; width: 100px; margin: 0 auto;">
                        <img src="https://fnftejz.stripocdn.email/content/guids/cab_pub_7cbbc409ec990f19c78c75bd1e06f215/images/Check_Mark_Blue2.png" alt="" width="100" class="adapt-img" style="display: block">
                    </div>
                    <h1 style="font-family:arial, 'helvetica neue', helvetica, sans-serif; width: 100%; margin: 0 auto; text-align: center;">Your item was sold</h1>
                    <div style="width: 100%; margin: 0 auto; gap: 20px;">
                      <div style="width: 100px; margin: 0 auto;">
                        <img src="${productData?.images[0]}" alt="product-thumbnail" width="100" style="width: 100px; margin: 0 auto;">
                      </div>
                      <div style="font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace; width: 100%; margin: 0 auto; text-align: center;">
                        ${productData?.title} <br>
                        Color: ${productData?.color} <br>
                        Size: ${productData?.size}
                      </div>
                    </div>
                    <p style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 20px; text-align: center;">We've sent your payment information to the buyer. Please send the item to the address listed below as soon as you receive your payment. To get more details about this transaction, check the 'Listings' tab on your account details page.</p>
                    <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">${buyerData?.fname} ${buyerData?.lname} (${buyerData?.email})  </span>
                    <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 5px;">${buyerData?.street} ${buyerData?.suite}</span>
                    <span style="font-family:arial, 'helvetica neue', helvetica, sans-serif; display: flex; justify-content: center; padding-bottom: 20px;">${buyerData?.zipcode} ${buyerData.city}</span>
                </div>
            </div>
        `;

        await Promise.all([
            sendEmail({
                to: buyerData.email,
                subject: buyerSubject,
                text: buyerText,
                html: buyerHtml,
            }),
            sendEmail({
                to: sellerData.email,
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
