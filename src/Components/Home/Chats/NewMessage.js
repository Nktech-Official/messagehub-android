import { PermissionsAndroid, TouchableOpacity, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';

import React, { useEffect, useState, } from 'react';
import { Box, HStack, Avatar, VStack, Spacer, Text } from 'native-base';
import Empty from '../Empty';



function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

export default function NewMessage() {
  const [isGranted, setIsGranted] = useState()
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    console.log('ne');
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    )
      .then((PermissionStatus) => {
        console.log(PermissionStatus);
        if (PermissionStatus === 'granted') {
          setIsGranted(true)

          Contacts.getAll()
            .then((contacts) => {
              // work with contacts
              setContacts(contacts)
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          setIsGranted(false)
        }
      }


      )
      .catch((er) => {
        console.log('error');
        console.log(er);
      })

  }, [])

  return (
    <Box>
      {
        contacts ?
          <FlatList
            data={contacts}
            keyExtractor={item => item.recordID}

            renderItem={({ item }) => {
              const x = item.displayName.split(' ');
              const f = x[0] ? x[0].slice(0, 1) : '';
              const l = x[1] ? x[1].slice(0, 1) : '';
              return (
                <>
                  {item.phoneNumbers[0] && <TouchableOpacity>
                    <Box pl={['0', '4']} pr={['0', '5']} py="2">
                      <HStack space={[2, 3]} justifyContent="space-between">
                        <Avatar
                          name={item.displayName}
                          color="amber.100"
                          size="48px"
                          source={{
                            uri: item.photoURL !== "" ? item.photoURL : "",
                          }}>
                          {`${f}${l}`}
                        </Avatar>
                        <VStack>
                          <Text
                            _dark={{
                              color: 'warmGray.50',
                            }}
                            // color="white"
                            color="amber.700"
                            fontSize={17}
                            fontWeight="500">
                            {item.displayName}
                          </Text>
                          <Text
                            color="amber.400"
                            _dark={{
                              color: 'warmGray.200',
                            }}>
                            {item.phoneNumbers[0]?.number}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text
                          fontSize="xs"
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="amber.300"
                          alignSelf="flex-start">
                          {item.timeStamp}
                        </Text>
                      </HStack>
                    </Box>
                  </TouchableOpacity>}</>)
            }} />
          :
          <Empty />
      }
    </Box>
  );
}
