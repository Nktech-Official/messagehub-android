
// import { StatusBar } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';

import useTheme from './ThemeConfig';
import { useColorMode, Box } from 'native-base';
import { ImageBackground, StatusBar } from 'react-native';
import Routes from './src/Navigation/Routes';
import { AuthProvider } from './src/Navigation/AuthProvider';
import database from '@react-native-firebase/database'


database().setPersistenceEnabled(true);
database().setPersistenceCacheSizeBytes(104857580); // 104MB


const image = require('./Assets/bg.png');

const App = () => {
  const Color = useColorMode();

  return (
    <ImageBackground source={image} resizeMode="stretch">
      <SafeAreaView height={'100%'}>
        <StatusBar
          backgroundColor="rgba(43, 41, 46, 0.8)"
          translucent={true}
          barStyle={Color === 'light' ? 'dark-content' : 'light-content'}
        />
        <Box height={'100%'} backgroundColor="transparent" mt={StatusBar.currentHeight}>
          <AuthProvider>

            <Routes />
          </AuthProvider>
        </Box>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default App;
