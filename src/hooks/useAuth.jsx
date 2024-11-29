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
    gender: "",
    bio: "",
  });

  const login = (id, username, profilPicture, token, gender, bio) => {
    setUser({ id, username, profilPicture, token, gender, bio });
  };

  const editProfile = (username, profilPicture, gender, bio) => {
    setUser({
      ...user,
      username: username,
      profilPicture: profilPicture,
      gender: gender,
      bio: bio,
    });
  };

  const logout = () => {
    setUser({
      id: 0,
      username: "",
      profilPicture: "",
      token: null,
      gender: "",
      bio: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, editProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
