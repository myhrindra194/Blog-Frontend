/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [token, setToken] = useLocalStorage("token", null);
    const [userId, setUserId] = useLocalStorage("userId", 0);

    const login = (id, token) => {
        setToken(token);
        setUserId(id);
    };

    const logout = () => {
        setToken(null);
        setUserId(0);
    };

    return <AuthContext.Provider value={{userId, token, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);