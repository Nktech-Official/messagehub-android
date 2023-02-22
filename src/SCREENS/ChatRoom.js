import { Input, Icon, FlatList, Text, Box, Spinner, } from 'native-base';
import Header from '../Components/ChatRoom/Header';
import React, { useState, useEffect } from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import { getSealdSDKInstance } from "../../config/SealdInit"
import { Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import Message from '../Components/ChatRoom/Message';
import axios from 'axios'




const windowHeight = Dimensions.get('window').height;

export default function ChatRoom({ route }) {
  const [data, setData] = useState([])
  const [msg, setMsg] = useState('');
  const [inputHeight, setInputHeight] = useState(20);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [Sesssion, setSesssion] = useState()
  const [loading, setLoading] = useState(false)

  const param = route.params;
  const { uid } = param;
  console.log(param);

  const handleContentSizeChange = event => {
    console.log(inputHeight);
    if (event.nativeEvent.contentSize.height > 120) {
      return
    }
    setInputHeight(event.nativeEvent.contentSize.height + 5);
  };
  useEffect(() => {
    database().ref(`${auth().currentUser.uid}/chats/${uid}/messages`).on('value', datax => {
      console.log(datax.val());
      if (datax.hasChildren()) {
        console.log(datax.numChildren());
        let x = [];
        let count = 0;
        database().ref(`${auth().currentUser.uid}/chats/${uid}/sessionId`).once('value').then(async sessionId => {
          console.log(sessionId.val());
          const session = await getSealdSDKInstance().retrieveEncryptionSession(
            { sessionId: sessionId.val() }
          );
          setSesssion(session);
          datax.forEach((msg) => {
            const item = msg.val()
            if (item.type !== 'audio' || !item.type) {
              x.push({
                message: item.message,
                send: item.send,
                type: item.type || 'text',
                session: session,
              })
              count++
              if (count === datax.numChildren()) {
                setData(x);
              }
            } else if (item.type === "audio") {
              x.push({
                url: item.url || "noURL",
                send: item.send,
                type: item.type,
                session: session,
              });
              count++;
              if (count === datax.numChildren()) {
                setData(x);
                console.log(data);
              }
            }
          })
        })
      }
    })
    return () => {
      database().ref(`${auth().currentUser.uid}/chats/${uid}/messages`).off()
    }
  }, [])
  const _keyboardDidShow = (event) => {
    setKeyboardHeight(event.endCoordinates.height);
  };

  const _keyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  const handleChange = (e) => {
    setMsg(e)
  }

  const handleSubmit = async () => {
    setLoading(true)
    if (msg && msg !== "") {
      Sesssion.encryptMessage(msg).then(async (encryptMessage) => {
        console.log(encryptMessage);
        axios
          .post(
            "https://message-hub.onrender.com/sendmessage",
            {
              message: encryptMessage,
              Recipetuid: uid,
              uid: auth().currentUser.uid,
            },
            {
              headers: {
                authorization: await auth().currentUser.getIdToken(),
                "Content-Type": "application/json",
              },
            }
          ).then(res => {
            console.log(res);
            setLoading(false)
            setMsg(null)
          }).catch(er => {
            console.log(er);
            setLoading(false)
          })

      })

    }

  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    }
  }, [])

  return (
    <Box h={windowHeight - 22}>
      <Box h={20}>
        <Header {...param} />
      </Box>
      <Box h={windowHeight - (90 + keyboardHeight)}>
        <FlatList mb={2} borderBottomWidth={0.6} borderColor={"rgba(36, 99, 235, 0.5)"} data={data} keyExtractor={(item, index) => index}
          renderItem={({ item }) => {

            return (
              <Box mt={2} minH={10} mb={0.5} justifyContent="center" alignItems={item.send ? "flex-end" : "flex-start"} >

                {item.type == 'text' ?
                  <Message {...item} /> : ""}
              </Box>
            )
          }}
        />

        <Box flexDirection='row' h={inputHeight}  >
          <Input
            value={msg}
            onChangeText={handleChange}
            color="white"
            w="85%"
            h={inputHeight}
            borderRadius={inputHeight > 50 ? "15" : 40}
            fontSize={18}
            backgroundColor="rgba(36, 99, 235, 0.2)"
            multiline
            focusOutlineColor="rgba(215, 36, 235, 0.4)"
            onContentSizeChange={handleContentSizeChange}
            isFocused={true}
            InputLeftElement={<Icon ml={1} onPress={() => { console.log('clicked'); }} size={'2xl'} alignSelf="flex-end" color="rgba(215, 36, 235, 0.4)" as={Entypo} name="emoji-happy" />}
            InputRightElement={<Icon mr={1} size={'2xl'} alignSelf="flex-end" color="rgba(215, 36, 235, 0.4)" as={Entypo} name="attachment" />} />
          <TouchableOpacity onPressOut={handleSubmit}>


            <Box ml={1} bg={"rgba(36, 99, 235, 0.2)"} borderColor="rgba(215, 36, 235, 0.4)" alignSelf="flex-end" alignItem='center' justifyContent="center" h={"45px"} w={"45px"} borderRadius={50} alignItems="center" borderWidth={1} >
              {loading ? <Spinner /> : <Icon size={'2xl'} color="rgba(215, 36, 235, 0.4)" as={MaterialIcons} name="send" />}
            </Box>
          </TouchableOpacity>
        </Box>
      </Box >
    </Box >

  );
}
