import React from 'react';

export const TokenContext = React.createContext({
  authToken: "hdqgs",
  siteId: null,
  siteName: null,
  handleToken: () => {},
  handleSite: () => {},
});