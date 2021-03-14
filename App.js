import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json'; // <-- Import app theme
import { default as mapping } from './mapping.json';
import Nav from "./src/navigation/nav.js";
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeContext } from './src/styles/themeContext.js';
import { TokenContext } from './src/components/general/context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/nav.js';
//Root of the app with the initialisation of all providers

export default function App() {
  const [isLoggin, setLoggin] = useState(false);
  const [token, setToken] = useState("defined");
  const [site, setSite] = useState(undefined);
  const [siteName, setSiteName] = useState(undefined);
  const [themes, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = themes === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const handleToken = (token) => {
    setToken(token);
  };
  const handleSite = (id,name) => {
    setSite(id);
    setSiteName(name)
  };

  //synchronisation of the theme
  const MyTheme = {
    dark: true,
    colors: {
      primary: theme["color-basic-900"],//selected color
      background: theme["color-basic-200"],
      card: theme["color-basic-100"],//header,bars
      text: theme["color-basic-1100"],
      border: theme['border-basic-color-1'],
      notification: 'rgb(255, 69, 58)',
    },
  };



  return (
    <TokenContext.Provider value={{token,site,siteName, handleToken,handleSite}}>
    <ThemeContext.Provider value={{ themes, toggleTheme }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva[themes], ...theme }} customMapping={mapping}>
        <SafeAreaProvider >
          <NavigationContainer ref={navigationRef} theme={MyTheme}>

            <Nav isSignIn={isLoggin} signIn={setLoggin}/>

          </NavigationContainer></SafeAreaProvider>
      </ApplicationProvider>
    </ThemeContext.Provider>
    </TokenContext.Provider>

  );
}