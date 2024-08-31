import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const response = await axios.get("/api/user/details", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    });
                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setLoading(false);
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
};

export default useAuth;
