import {Box, Icon} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

export default function FloatingIcon(props) {
  return (
    <Box zIndex={10} position="absolute" right={3} bottom={3}>
      <TouchableOpacity onPress={props.onPress}>
        <Box
          backgroundColor={props.bg}
          w={58}
          h={58}
          justifyContent="center"
          alignItems={'center'}
          borderRadius={'full'}>
          <Icon
            size={28}
            color="danger.100"
            as={props.type}
            name={props.Iname}
          />
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
