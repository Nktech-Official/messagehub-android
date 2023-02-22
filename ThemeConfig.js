import React from 'react';
import {useColorMode, useColorModeValue} from 'native-base';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function useTheme() {
  const {toggleColorMode} = useColorMode();
  const config = {
    Text: useColorModeValue('black', '#ffffff'),
    Bg: useColorModeValue(Colors.light, Colors.dark),
    statusbar: useColorMode('dark-content', 'light-content'),
  };

  return {toggleColorMode, config};
}

export default useTheme;
