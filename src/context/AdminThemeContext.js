import React from "react";
import { createContext, useContext, useState } from "react";

const AdminThemeContext = createContext({
  menuOpen: false,
  setMenuOpen: null,
  pageName: '',
  setPageName: null
});

export const AdminThemeProvider = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [pageName, setPageName] = useState('');

  return <AdminThemeContext.Provider value={{
    menuOpen,
    setMenuOpen,
    pageName,
    setPageName
  }}>
    {children}
  </AdminThemeContext.Provider>;
};

export const useAdminTheme = () => useContext(AdminThemeContext);
