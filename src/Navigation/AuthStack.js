import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../SCREENS/Auth/Login';
import SignUp from "../SCREENS/Auth/SignUp"
import Forget from '../SCREENS/Auth/Forget';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Forget" component={Forget} />
        </Stack.Navigator>
    )
}