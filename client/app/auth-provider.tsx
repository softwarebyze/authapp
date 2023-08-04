"use client";
import { createContext, useState } from "react";

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
  const [userId, setUserId] = useState<string | null>(null); // Explicitly set the type for userId

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
