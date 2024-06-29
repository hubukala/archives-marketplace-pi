import { auth } from "@/lib/firebase/config";

const getValidToken = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");
    const token = await currentUser.getIdToken(true); // true forces a refresh
    return token;
};

export default getValidToken;
