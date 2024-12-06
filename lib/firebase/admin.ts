import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
    credential: cert({
        projectId: "archives-marketplace",
        clientEmail:
            "firebase-adminsdk-55nh6@archives-marketplace.iam.gserviceaccount.com",
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
};

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
