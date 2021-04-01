import React from 'react';

export const TokenContext = React.createContext({
  authToken: "undefined",
  siteId: null,
  siteName: null,
  handleToken: () => {},
  handleSite: () => {},
});