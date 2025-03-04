import { createContext, useContext, useState, type PropsWithChildren } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  password?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    // Simulate login
    setUser({ id: '1', email: credentials.email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      {/* @ts-ignore */}
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
