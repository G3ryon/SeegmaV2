import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { default as theme } from './theme.json'; // <-- Import app theme
import { default as mapping } from './mapping.json';
import Nav from "./src/navigation/nav.js";
import { NavigationContainer } from '@react-navigation/native';

export default function App(){
  const [isLoggin, setLoggin] = useState(false);
  const [token, setToken] = useState(undefined);
  const [site, setSite] = useState(undefined);

  return(  
  <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
    <NavigationContainer>
      <Nav isSignIn={isLoggin} signIn={setLoggin} authToken={token} setAuth={setToken} site={site} setSite={setSite}/>
    </NavigationContainer>
  </ApplicationProvider>
  
);
}