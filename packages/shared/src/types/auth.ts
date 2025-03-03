export interface AuthContextValue {
  user: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
  } | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

export interface ResetPasswordData {
  email: string;
  code: string;
  newPassword: string;
}
