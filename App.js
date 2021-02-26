import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json'; // <-- Import app theme
import { default as mapping } from './mapping.json';
import Nav from "./src/navigation/nav.js";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from './src/styles/themeContext.js';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

//Root of the app with the initialisation of all providers

export default function App() {
  const [isLoggin, setLoggin] = useState(false);
  const [token, setToken] = useState(undefined);
  const [site, setSite] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [themes, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = themes === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
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

    <ThemeContext.Provider value={{ themes, toggleTheme }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva[themes], ...theme }} customMapping={mapping}>
        <SafeAreaProvider >
          <NavigationContainer theme={MyTheme}>

            <Nav isSignIn={isLoggin} signIn={setLoggin} authToken={token} setAuth={setToken} site={site} setSite={setSite} userId={userId} setUserId={setUserId} />

          </NavigationContainer></SafeAreaProvider>
      </ApplicationProvider>
    </ThemeContext.Provider>

  );
}