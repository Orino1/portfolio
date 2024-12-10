import { useContext, createContext, useEffect, useState } from "react";
import { api, privateApi } from "../apiService";

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const response = await api.get("/auth/status");
                if (response.status === 200) {
                    setIsAdmin(true);
                }
            } catch (err) {
                setIsAdmin(false);
            }
        }

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}
