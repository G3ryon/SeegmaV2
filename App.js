import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { default as theme } from './theme.json'; // <-- Import app theme
import { default as mapping } from './mapping.json';
import Nav from "./src/navigation/nav.js";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from './src/styles/themeContext.js';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
export default function App(){
  const [isLoggin, setLoggin] = useState(false);
  const [token, setToken] = useState(undefined);
  const [site, setSite] = useState(undefined);
  const [themes, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = themes === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',//selected color
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',//header,bars
      text: theme[theme['text-basic-color']],
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };
  
  return(
    <ThemeContext.Provider value={{ themes, toggleTheme }}>
  <ApplicationProvider {...eva} theme={{ ...eva[themes],...theme}} customMapping={mapping}>
  
    <NavigationContainer theme={MyTheme}>
      
      <Nav isSignIn={isLoggin} signIn={setLoggin} authToken={token} setAuth={setToken} site={site} setSite={setSite}/>
      
    </NavigationContainer>
  </ApplicationProvider>
  </ThemeContext.Provider>  
  
);
}