/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", {
    id: 0,
    username: "",
    profilPicture: "",
    token: null,
  });

  const login = (id, username, profilePicture, token) => {
    setUser({ id, username, profilePicture, token });
  };

  const logout = () => {
    setUser({ id: 0, username: "", profilPicture: "", token: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
