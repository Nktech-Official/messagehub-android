/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { NativeBaseProvider } from 'native-base';
import { colorModeManager } from './theme';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { getRecentMsg } from "./config/WaterMelon"


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
function Index() {

  return (
    <NavigationContainer theme={MyTheme}>
      <NativeBaseProvider colorModeManager={colorModeManager}>
        <App />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Index);
