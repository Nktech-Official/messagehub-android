import {Box, Text, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
export default function Header(props) {
  return (
    <Box
      flex={1}
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      bgColor="rgba(43, 41, 46, 0.6)">
      <Text
        ml={5}
        fontSize={18}
        letterSpacing={1.2}
        color="rgba(255, 0, 220, 1)">
        MessageHub
      </Text>
      <Box
        h="100%"
        w="50%"
        justifyContent="flex-end"
        alignItems="center"
        flexDirection="row">
        <TouchableOpacity>
          <Icon
            as={EvilIcons}
            fontWeight={'700'}
            name="search"
            size={30}
            mr={5}
            color="rgba(255, 0, 220, 1)"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            as={Entypo}
            name="dots-three-vertical"
            size={22}
            mr={3}
            color="rgba(255, 0, 220, 1)"
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
