"use client";
import { createContext, useEffect, useState } from "react";

// Define the type for AuthContext
interface AuthContext {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContext>({
  userId: null,
  setUserId: () => {}, // A dummy function to avoid errors during development, will be overwritten by the actual function from useState
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const userIdFromLocalStorage =
    typeof window !== "undefined" ? localStorage?.getItem("userId") : null;
  const [userId, setUserId] = useState(userIdFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("userId", userId || "");
  }, [userId]);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
