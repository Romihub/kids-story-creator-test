// src/components/auth/AuthProvider.tsx
import React, { createContext, useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';

const AuthContext = createContext<ReturnType<typeof useAuth>>({
  user: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);