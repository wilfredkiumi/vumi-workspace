import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext<{
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
