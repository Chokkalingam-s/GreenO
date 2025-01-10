import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');

    if (token) {
      setIsAuthenticated(true);
      setRole(savedRole || ''); 
    } else {
      setIsAuthenticated(false);
      setRole('');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
