import React, { useState, useContext, useEffect } from 'react';
import { Center, Box, Heading, VStack, FormControl, Input, ScrollView, HStack, Text, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import EyeIcon from "../../Components/Auth/EyeIcon.js"
import { AuthContext } from "../../Navigation/AuthProvider"
import { GradientButton } from "../../Components/utils/Button.js"
import HeaderAuth from "../../Components/Auth/Header"
import SplashScreen from 'react-native-splash-screen';
import Notifier from '../../Components/Auth/Notifier.js';


export default function Login() {
  const { login, authenticate, submitChallenge, error, Seterror } = useContext(AuthContext)
  const navigation = useNavigation();
  const [shopass, setShopass] = useState(false)
  const [email, setEmail] = useState(null)
  const [password, setpassword] = useState(null)
  const [challenge, setChallenge] = useState()
  const [emailVal, setEmailVal] = useState({
    message: null,
    val: true
  })
  const showPass = () => {
    setShopass(!shopass)

  }

  useEffect(() => {
    SplashScreen.hide();

  })
  return (
    <ScrollView mb={10} >
      <Box alignItems="center" h="100%">
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <HeaderAuth />
            <Heading mt="1" color="blue.500"
              fontWeight="medium" size="md">
              Login to continue!
            </Heading>
            <VStack space={3} mt="5">
              <Box h={10}>
                <Notifier error={error} bg={error.code === "otp_sent" ? "green.500" : "red.700"} />

              </Box>
              <FormControl isRequired isInvalid={!emailVal.val}>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input onChangeText={(e) => {
                  Seterror({
                    code: e,
                    error: false,
                    message: "",
                  })
                  if (e == undefined || e == "") {
                    ; setEmailVal({
                      val: false,
                      message: "Email cannot be empty"
                    })
                  } else if (e.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/)) {
                    setEmailVal({ val: true, message: null })
                    setEmail(e)

                  } else {
                    setEmailVal({ val: false, message: "Invalid Email" })

                  }
                }} variant="underlined" color="amber.100" fontSize="md"
                  InputLeftElement={<Icon as={Ionicons} name="person-outline" size={5} ml="2" mr="3" color="muted.400" />} placeholder="username@example.com" />
                {!emailVal.val && <FormControl.ErrorMessage>{emailVal.message}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label>Password</FormControl.Label>
                <Input onChangeText={(e) => {
                  setpassword(e)
                }} variant="underlined" type={!shopass ? 'password' : "text"} color="amber.100" fontSize="md"
                  InputRightElement={<EyeIcon name={!shopass ? "ios-eye-outline" : "ios-eye-off-outline"} onPress={showPass} />}
                  InputLeftElement={<Icon as={EvilIcons} name="lock" size={8} ml="2" mr="2" color="muted.400" />} placeholder="password" />
                <Text color="indigo.500"
                  fontWeight="medium"
                  fontSize="sm"
                  alignSelf="flex-end" mt="1"
                  onPress={() => { navigation.navigate('Forget'); }}
                >
                  Forget Password?
                </Text>
              </FormControl>
              <GradientButton onPress={() => {
                if (email && password && email !== "" && password !== "") {
                  login(email, password)
                } else {
                  console.log("empty");
                }
              }}
              >
                <Text color="amber.100" my={3}>

                  LOGIN
                </Text>
              </GradientButton>

              {authenticate && <FormControl >
                <FormControl.Label>OTP</FormControl.Label>
                <Input onChangeText={(e) => {
                  setChallenge(e)
                }} variant="underlined" type="text" color="amber.100" fontSize="md" mb={4}
                  placeholder="OTP" />
                <GradientButton onPress={() => {
                  if (challenge) {
                    submitChallenge(challenge, password)
                  } else {
                    console.log("empty");
                  }
                }}
                >
                  <Text color="amber.100" my={3}>

                    SUBMIT
                  </Text>
                </GradientButton>
              </FormControl>}
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                  I'm a new user.{" "}
                </Text>
                <Text
                  color="indigo.500"
                  fontWeight="medium"
                  fontSize="sm"
                  onPress={() => { navigation.navigate('SignUp'); }} >
                  Sign Up
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Center >
      </Box>
    </ScrollView>
  )
}
