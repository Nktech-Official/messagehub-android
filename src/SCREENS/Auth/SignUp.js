import { Center, Box, Heading, VStack, FormControl, Input, Icon, HStack, Text, ScrollView } from 'native-base';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from "../../Components/utils/Button.js"
import HeaderAuth from "../../Components/Auth/Header"
import Ionicons from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import EyeIcon from "../../Components/Auth/EyeIcon.js"



export default function SignUp() {
    const navigation = useNavigation();
    const [shopass, setShopass] = useState(false)
    const showPass = () => {
        setShopass(!shopass)

    }
    return (
        <ScrollView mb={5} >
            <Box alignItems="center" h="100%">
                <Center w="80%" borderColor="black" borderWidth={0}>
                    <Box safeArea p="2" w="90%" maxW="290" py="8">

                        <HeaderAuth />
                        <Heading mt="1" color="blue.500"
                            fontWeight="medium" size="md">
                            Sign up to continue!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input variant="underlined" color="amber.100" fontSize="md"
                                    InputLeftElement={<Icon as={Ionicons} name="person-outline" size={5} ml="2" mr="3" color="muted.400" />} placeholder="username@example.com" />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    variant="underlined"
                                    type={!shopass ? 'password' : "text"}
                                    color="amber.100"
                                    fontSize="md"
                                    InputRightElement={<EyeIcon name={!shopass ? "ios-eye-outline" : "ios-eye-off-outline"} onPress={showPass} />}
                                    InputLeftElement={<Icon as={EvilIcons} name="lock" size={8} ml="2" mr="2" color="muted.400" />}
                                    placeholder="password" />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Confirm Password</FormControl.Label>
                                <Input
                                    variant="underlined"
                                    type={!shopass ? 'password' : "text"}
                                    color="amber.100"
                                    fontSize="md"
                                    InputRightElement={<EyeIcon name={!shopass ? "ios-eye-outline" : "ios-eye-off-outline"} onPress={showPass} />}
                                    InputLeftElement={<Icon as={EvilIcons} name="lock" size={8} ml="2" mr="2" color="muted.400" />}
                                    placeholder="confirm password" />
                            </FormControl>
                            <GradientButton >

                                <Text color="amber.100" my={3}>

                                    Create Account
                                </Text>
                            </GradientButton>
                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    Already a User?{" "}
                                </Text>
                                <Text
                                    color="indigo.500"
                                    fontWeight="medium"
                                    fontSize="sm"

                                    onPress={() => { navigation.navigate('Login'); }}>
                                    Login
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </Box>
        </ScrollView>
    );
}