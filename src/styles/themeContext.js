import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const TokenContext = React.createContext({
  authToken: "hdqgs",
  siteId: null,
  siteName: null,
  handleToken: () => {},
  handleSite: () => {},
});