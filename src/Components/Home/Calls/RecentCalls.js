import {Box, Text} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingIcon from '../FloatingIcon';
import {useNavigation} from '@react-navigation/native';

export default function RecentCalls({route}) {
  // route.params.setIc('ed');
  const navigation = useNavigation();

  return (
    <Box flex={1}>
      <FloatingIcon
        bg={'rgba(255, 0, 220, .8)'}
        Iname={'phone-plus'}
        type={MaterialCommunityIcons}
        onPress={() => {
          navigation.navigate('newCalls');
        }}
      />
      <Text color="white">RecentCall</Text>
    </Box>
  );
}
