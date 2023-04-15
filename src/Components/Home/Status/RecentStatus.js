import { Box, Text } from 'native-base';
import React from 'react';
import FloatingIcon from '../FloatingIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Empty from '../Empty';

export default function RecentStatus({ route }) {
  // route.params.setIc('status');
  const navigation = useNavigation();

  return (
    <Box flex={1}>
      <FloatingIcon
        bg={'rgba(255, 0, 220, .8)'}
        Iname={'camera-plus'}
        type={MaterialCommunityIcons}
        onPress={() => {
          navigation.navigate('addStatus');
        }}
      />
      <Empty />
    </Box>
  );
}
