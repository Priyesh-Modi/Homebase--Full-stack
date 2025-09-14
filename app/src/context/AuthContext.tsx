import { createContext, useEffect, useState, ReactNode } from "react";

// Update the User type to include avatar and username
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;  // Include avatar as optional
  username: string; // Include username as required
}

interface AuthContextType {
  currentUser: User | null;
  updateUser: (data: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (data: User | null) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
      <AuthContext.Provider value={{ currentUser, updateUser }}>
        {children}
      </AuthContext.Provider>
  );
};
