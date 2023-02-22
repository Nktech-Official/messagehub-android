import {Box, Text, Divider} from 'native-base';
import React from 'react';

export default function Tab() {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      backgroundColor="rgba(43, 41, 46, 0.6)"
      flex={1}>
      <Box
        w={'33%'}
        h={'100%'}
        alignItems="center"
        justifyContent="space-between">
        <Text
          fontWeight={'600'}
          textAlign="center"
          fontSize={16}
          color="rgba(255, 0, 220, 1)">
          CHATS
        </Text>
        <Divider bg="rgba(255, 0, 220, 1)" w={'80%'} h={1.9} />
      </Box>

      <Box
        w={'33%'}
        h={'100%'}
        alignItems="center"
        justifyContent="space-between">
        <Text
          fontWeight={'600'}
          textAlign={'center'}
          fontSize={16}
          color="danger.50">
          STATUS
        </Text>
      </Box>

      <Box
        w={'33%'}
        h={'100%'}
        alignItems="center"
        justifyContent="space-between">
        <Text
          fontWeight={'600'}
          textAlign="center"
          fontSize={16}
          color="danger.50">
          CALLS
        </Text>
        {/* <Divider color="muted.500" w={'80%'} h={1.9} /> */}
      </Box>
    </Box>
  );
}
