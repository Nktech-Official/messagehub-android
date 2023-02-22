import React, { useState } from 'react';
import { Box } from 'native-base';
import Header from '../Components/root/Header';

import HomeTab from '../Navigation/HomeTab';


export default function Home(props) {



  return (
    <Box mb={9} flex={1}>
      <Box flex={1}>
        <Header />
      </Box>
      <Box flex={12}>
        <HomeTab />
      </Box>
    </Box>
  );
}
