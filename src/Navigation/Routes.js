import React, { useContext, useState, useEffect } from 'react'
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { AuthContext } from "./AuthProvider"
import auth from "@react-native-firebase/auth"
import { Box, Image, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveIdentityFromLocalStorage } from "../../config/SealdInit"



export default function Routes() {
    const { user, setUser, initializing, setInitializing } = useContext(AuthContext)
    const [splash, setSplash] = useState(true)
    const onAuthStateChanged = async (u) => {
        setSplash(false)
        const login = await AsyncStorage.getItem("@login")
        console.log("u", u);
        console.log("login", login);
        // if (u) {
        //     setUser(u)
        // }
        if (u && login == "true") {
            setInitializing(true)
            setUser(u)

            const ap = await AsyncStorage.getItem("@appId")
            const dbkey = await AsyncStorage.getItem("@databaseKey")
            const sid = await AsyncStorage.getItem("@sessionID")

            console.log("ap", ap);
            console.log("dbkey", dbkey);
            console.log("sid", sid);

            retrieveIdentityFromLocalStorage({ appId: ap, databaseKey: dbkey, sessionID: sid })
                .then(() => {
                    setInitializing(false)

                })
                .catch(async e => {
                    setInitializing(true)
                    await auth().signOut()
                    console.log("error seald logout process.");
                    await AsyncStorage.removeItem("@login")
                    await AsyncStorage.removeItem("@appId")
                    await AsyncStorage.removeItem("@databaseKey")
                    await AsyncStorage.removeItem("@sessionID")
                    setUser(null)
                    setInitializing(false)

                })
        } else {
            await AsyncStorage.removeItem("@login")

            setInitializing(false)
        }

    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])


    return (
        <>
            {initializing ?
                <Box flexDirection="column" h="100%" alignItems="center" >
                    <Box space={2} mt={250} alignItems="center" justifyContent="center">

                        <Image w={150} alt={"logo"} zIndex={100} h={150} source={require("../../Assets/WelcomeIcon.png")} />
                        <Text mt={250} color="#25F5F5" fontWeight="600" letterSpacing={2} fontSize={40}>
                            Message Hub
                        </Text>
                        <Text color="#25F5F5" textAlign="center" letterSpacing={2} fontSize={18}>
                            Simple. Secure.
                        </Text>
                        <Text color="#25F5F5" textAlign="center" letterSpacing={2} fontSize={18}>
                            Reliable messaging
                        </Text>
                    </Box>
                </Box>
                : user ? <AppStack /> : <AuthStack />}
        </>

    )
}