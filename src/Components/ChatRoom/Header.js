import React from 'react';
import { Box, Text, Avatar, Icon } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header(item) {
  const navigation = useNavigation();

  return (
    <Box
      backgroundColor="rgba(43, 41, 46, 0.6)"
      h={20}
      display="flex"
      w="100%"
      alignItems="center"
      flexDirection="row">
      <TouchableOpacity onPress={() => { navigation.goBack(); }}>
        <Icon ml={2} size="3xl" color="white" as={Ionicons} name="arrow-back" />

      </TouchableOpacity>
      <Avatar
        ml={3}
        name={item.fullName}
        size={'65px'}
        source={{
          uri: item.photoURL !== "" ? item.photoURL : undefined,
        }}></Avatar>{' '}
      <Text fontSize={18} fontWeight="700" color="white" ml={2}>
        {item.name}
      </Text>
    </Box>
  );
}
