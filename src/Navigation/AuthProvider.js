import React, { createContext, useState } from 'react'
import auth from "@react-native-firebase/auth"
import { retrieveIdentity } from "../../config/SealdInit.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true)
    const [passRetrival, setPassRetrival] = useState();
    const [authenticate, setAuthenticate] = useState(false);
    const [atwoManRuleKey, setTwoManRuleKey] = useState();
    const [atwoManRuleSessionId, setTwoManRuleSessionId] = useState();
    const [databaseKey, setDatabaseKey] = useState()
    const [SessionID, setSessionID] = useState()
    const [appId, setAppId] = useState()
    const [error, Seterror] = useState({
        code: null,
        error: false,
        message: null,
    }); // Manage Error State
    const BASE_URL = "https://message-hub.onrender.com"
    const submitChallenge = async (challenge, password) => {
        try {
            setInitializing(true)
            await retrieveIdentity({
                challenge: challenge,
                userId: auth().currentUser.uid,
                twoManRuleKey: atwoManRuleKey,
                emailAddress: auth().currentUser.email,
                twoManRuleSessionId: atwoManRuleSessionId,
                databaseKey: databaseKey,
                sessionID: SessionID,
                password: passRetrival ? password : false,
                appId: appId,
            });
            console.log("selad login");
            setUser(auth().currentUser)
            await AsyncStorage.setItem("@login", "true")
            setInitializing(false)
        } catch (e) {
            console.log(e);
            auth().signOut().then(() => {
                // Request to clear databaekey and session id and destroy the session after logout

                axios
                    .post(
                        `${BASE_URL}/session/logout`,
                        { reqest: "logout" },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((res) => {
                        // localStorage.removeItem("user");
                        // localStorage.setItem("login", false);
                        setAuthenticate(false);
                        // Setloading(false);
                        // setOtpLoading(false);
                        // Seterror({
                        //     code: "Invalid OTP",
                        //     error: true,
                        //     message: "Invalid OTP login again",
                        // });
                    });
            });
        }
    };
    const login = async (email, password) => {
        try {
            setInitializing(true)
            auth().signInWithEmailAndPassword(email, password)
                .then(async (userCredential) => {

                    axios.post(`${BASE_URL}/session/login`,
                        {
                            uid: auth().currentUser.uid,
                            mode: "mobile"
                        },
                        {
                            headers: {
                                Authorization: await auth().currentUser.getIdToken(),
                                "Content-Type": "application/json",
                            },
                        }
                    ).then(async (res) => {
                        const {
                            twoManRuleSessionId,
                            twoManRuleKey,
                            mustAuthenticate,
                            passRetrival,
                            appId, sessionId,
                            databaseKey,
                        } = res.data;

                        await AsyncStorage.setItem("@appId", appId)
                        await AsyncStorage.setItem("@sessionID", sessionId)
                        await AsyncStorage.setItem("@databaseKey", databaseKey)
                        if (mustAuthenticate) {
                            setAuthenticate(true);
                            setTwoManRuleSessionId(twoManRuleSessionId);
                            setTwoManRuleKey(twoManRuleKey);
                            setPassRetrival(passRetrival);
                            setDatabaseKey(databaseKey)
                            setSessionID(sessionId)
                            setAppId(appId)
                            Seterror({
                                code: "otp_sent",
                                error: false,
                                message: "OTP sent check your mail",
                            });
                        } else {
                            await retrieveIdentity({
                                userId: auth.currentUser.uid,
                                databaseKey: databaseKey,
                                sessionID: sessionID,
                                emailAddress: auth.currentUser.email,
                                twoManRuleKey: twoManRuleKey,
                                twoManRuleSessionId: twoManRuleSessionId,
                                password: passRetrival ? password : false,
                                appId: appId,
                            });
                        }
                        setInitializing(false)

                    }).catch((e) => {
                        signOut(auth).then(() => {
                            // Request to clear databaekey and session id and destroy the session after logout
                            axios
                                .post(
                                    "/session/logout",
                                    { reqest: "logout" },
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                )
                                .then((res) => {
                                    localStorage.removeItem("user");
                                    localStorage.setItem("login", false);
                                    setAuthenticate(false);
                                    Setloading(false);
                                    setOtpLoading(false);
                                    Seterror({
                                        code: "500",
                                        error: true,
                                        message: "Internal Server Erorr.",
                                    });
                                    console.log(err);
                                });
                        });
                    })
                }).catch((error) => {
                    console.log(error.code);
                    if (error.code === "auth/user-not-found") {
                        Seterror({
                            code: error.code,
                            error: true,
                            message: "unregisterd user Sign Up",
                        });
                        // Error Handling Invalid Email Id
                    } else if (error.code === "auth/invalid-email") {
                        Seterror({
                            code: error.code,
                            error: true,
                            message: "Invalid Email address",
                        });
                        // Error Handling Wrong Password
                    } else if (error.code === "auth/wrong-password") {
                        Seterror({
                            code: error.code,
                            error: true,
                            message: "Forget your password? Reset it",
                        });
                    } else {
                        // Error Handling Unknown Error
                        Seterror({
                            code: error.code,
                            error: true,
                            message: "Something went wrong try again",
                        });
                        console.log(error.code);
                    }

                    setInitializing(false)

                })
        } catch (e) {
            console.log(e);
        }
    }
    const register = async (email, password) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (e) {
            console.log(e);
        }
    }
    const logout = async () => {
        try {
            await auth.signOut()
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                initializing,
                setInitializing,
                authenticate,
                appId,
                SessionID,
                databaseKey,
                passRetrival,
                error,
                Seterror: Seterror,
                login: login,
                register: register,
                logout: logout,
                submitChallenge: submitChallenge,
                setAppId: setAppId,
                setDatabaseKey: setDatabaseKey,
                setSessionID: setSessionID
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
