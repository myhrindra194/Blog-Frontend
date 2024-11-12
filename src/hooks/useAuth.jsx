/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [token, setToken] = useLocalStorage("token", null)

    const login = (data) => {
        setToken(data);
    };

    const logout = () => {
        setToken(null);
    };
    

    return <AuthContext.Provider value={{token, login, logout}}>{children}</AuthContext.Provider>

}

export const useAuth = () => {
    return useContext(AuthContext);
  };