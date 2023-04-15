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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth"
import { getSealdSDKInstance } from "../../../../config/SealdInit"
import { AuthContext } from "../../../Navigation/AuthProvider"
import SplashScreen from 'react-native-splash-screen';
import { getRecentMsg } from '../../../../config/WaterMelon';
import Empty from '../Empty';
import firebaseDB from '../../../../config/FirebaseDb';

export default function Recent() {
  const [data, setData] = useState();
  const [hasData, setHasData] = useState(true);
  const { setInitializing, initializing } = useContext(AuthContext)


  // useEffect(() => {
  //   database().ref(`/${auth().currentUser.uid}/chats/`).on('value', datax => {
  //     const x = [];
  //     let itemsProcessed = 0;
  //     if (datax.hasChildren()) {
  //       setHasData(true);
  //       datax.forEach((data) => {
  //         database().ref(`${data.key}/PersonalInfo`).on('value',
  //           (snapshot) => {
  //             database().ref(`${auth().currentUser.uid}/chats/${data.key}/messages`).limitToLast(1).on('value', (mesg) => {
  //               mesg.forEach(async (mesg) => {
  //                 if (mesg.val().type !== "audio") {
  //                   const session =
  //                     await getSealdSDKInstance().retrieveEncryptionSession(
  //                       { encryptedMessage: mesg.val().message }
  //                     );
  //                   const decryptMessage = await session.decryptMessage(
  //                     mesg.val().message
  //                   );
  //                   x.push({
  //                     ...snapshot.val(),
  //                     message: decryptMessage,
  //                   });
  //                 } else if (mesg.val().type === "audio") {
  //                   x.push({
  //                     ...snapshot.val(),
  //                     message: "🔊 Audio Message",
  //                   });
  //                 }
  //                 itemsProcessed++;
  //                 // setData(x);
  //                 if (itemsProcessed === datax.numChildren()) {
  //                   setData(x);
  //                   SplashScreen.hide();

  //                 }
  //               });
  //             })


  //           }
  //         );
  //       });
  //     } else {
  //       setHasData(false);
  //     }

  //   })

  // }, [])


  useEffect(() => {
    firebaseDB()
    getRecentMsg().then((data) => {
      console.log(data);
      console.log(data.length);
      let x;
      if (data.length > 0) {
        x = [];
        data.forEach((val, ind) => {
          x.push({
            name: val.name,
            uid: val.id,
            photoURL: val.profile_url,
            message: val.r_msg


          })

        })
      }

      setData(x)
      SplashScreen.hide();

    }).catch(e => {
      console.log(e);
    })
    SplashScreen.hide();
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

        keyExtractor={item => item.uid}
        // ItemSeparatorComponent={() => {
        //   return <Divider bg="muted.500" />;
        // }}
        renderItem={({ item }) => {
          // console.log(item);
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
      /> : <Empty type={MaterialCommunityIcons} name={'message-processing'} type2={MaterialCommunityIcons
      } name2='message-reply' heading={"You've got no messages"} desc={"No messages in your inbox, Start chatting with your friends & family."} />}
    </Box>
  );
}
