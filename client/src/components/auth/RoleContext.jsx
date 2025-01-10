import { createContext, useEffect, useState } from 'react';

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem('role') || '');

  useEffect(() => {
    localStorage.setItem('role', role); 
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export default RoleContext;
