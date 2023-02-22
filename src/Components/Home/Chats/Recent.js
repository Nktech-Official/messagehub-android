import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Box,
  HStack,
  Avatar,
  VStack,
  Text,
  Spacer,
  Divider,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import FloatingIcon from '../FloatingIcon';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth"
import { getSealdSDKInstance } from "../../../../config/SealdInit"
import { AuthContext } from "../../../Navigation/AuthProvider"
import SplashScreen from 'react-native-splash-screen';

export default function Recent() {
  const [data, setData] = useState();
  const [hasData, setHasData] = useState(true);
  const { setInitializing, initializing } = useContext(AuthContext)


  useEffect(() => {
    database().ref(`/${auth().currentUser.uid}/chats/`).on('value', datax => {
      const x = [];
      let itemsProcessed = 0;
      console.log(datax.hasChildren());
      if (datax.hasChildren()) {
        setHasData(true);
        console.log(datax);
        datax.forEach((data) => {
          console.log(data.key);
          database().ref(`${data.key}/PersonalInfo`).on('value',
            (snapshot) => {
              console.log(snapshot);
              database().ref(`${auth().currentUser.uid}/chats/${data.key}/messages`).limitToLast(1).on('value', (mesg) => {
                mesg.forEach(async (mesg) => {
                  console.log(mesg.val());
                  if (mesg.val().type !== "audio") {
                    const session =
                      await getSealdSDKInstance().retrieveEncryptionSession(
                        { encryptedMessage: mesg.val().message }
                      );
                    const decryptMessage = await session.decryptMessage(
                      mesg.val().message
                    );
                    console.log(decryptMessage);
                    x.push({
                      ...snapshot.val(),
                      message: decryptMessage,
                    });
                  } else if (mesg.val().type === "audio") {
                    x.push({
                      ...snapshot.val(),
                      message: "🔊 Audio Message",
                    });
                  }
                  itemsProcessed++;
                  console.log(datax);
                  // setData(x);
                  console.log(datax.numChildren());
                  if (itemsProcessed === datax.numChildren()) {
                    console.log("comlete");
                    setData(x);
                    SplashScreen.hide();

                  }
                });
              })


            }
          );
        });
      } else {
        setHasData(false);
      }

    })

  }, [])

  const navigation = useNavigation();
  return (
    <Box flex={1}>
      <FloatingIcon
        bg={'rgba(255, 0, 220, .8)'}
        Iname={'message-plus'}
        type={MaterialCommunityIcons}
        onPress={() => {
          navigation.navigate('newMessage');
        }}
      />
      {data ? <FlatList
        zIndex={1}
        data={data}
        keyExtractor={item => item.name}
        // ItemSeparatorComponent={() => {
        //   return <Divider bg="muted.500" />;
        // }}
        renderItem={({ item }) => {
          const x = item.name.split(' ');
          const f = x[0]?.slice(0, 1);
          const l = x[1]?.slice(0, 1);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatRoom', { ...item });
              }}>
              <Box pl={['0', '4']} pr={['0', '5']} py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    name={item.name}
                    color="amber.100"
                    size="48px"
                    source={{
                      uri: item.photoURL !== "" ? item.photoURL : undefined,
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
                      {item.name}
                    </Text>
                    <Text
                      color="amber.400"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.message}
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
            </TouchableOpacity>
          );
        }}
      /> : <Text>he</Text>}
    </Box>
  );
}
