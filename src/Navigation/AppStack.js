import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../SCREENS/Home';
import ChatRoom from '../SCREENS/ChatRoom';
import NewCalls from '../Components/Home/Calls/NewCalls';
import RecentCalls from '../Components/Home/Calls/RecentCalls';
import RecentChats from '../Components/Home/Chats/Recent';
import NewMessage from '../Components/Home/Chats/NewMessage';
import RecentStatus from '../Components/Home/Status/RecentStatus';
import AddStatus from '../Components/Home/Status/AddStatus';
import { getRecentMsg } from '../../config/WaterMelon';
// import Login from '../SCREENS/Auth/Login';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { retrieveIdentityFromLocalStorage } from "../../config/SealdInit"
// import auth from "@react-native-firebase/auth"



const Stack = createNativeStackNavigator();
// const retriveId = async () => {
//     const ap = await AsyncStorage.getItem("@appId")
//     const dbkey = await AsyncStorage.getItem("@databaseKey")
//     const sid = await AsyncStorage.getItem("@sessionID")

//     console.log("ap", ap);
//     console.log("dbkey", dbkey);
//     console.log("sid", sid);

//     retrieveIdentityFromLocalStorage({ appId: ap, databaseKey: dbkey, sessionID: sid })
//         .then(() => {
//             console.log("retrivedjhjghjghjghjgh");

//         })
//         .catch(async e => {
//             await auth().signOut()
//             console.log("error seald logout process.");
//             await AsyncStorage.removeItem("@login")

//         })
// }
export default function AppStack() {
    useEffect(() => {
        // retriveId()
    }, [])
    // console.log(getRecentMsg());


    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="Login" component={Login} /> */}
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
            <Stack.Screen name="recentCalls" component={RecentCalls} />
            <Stack.Screen name="newCalls" component={NewCalls} />
            <Stack.Screen name="recentChats" component={RecentChats} />
            <Stack.Screen name="newMessage" component={NewMessage} />
            <Stack.Screen name="resentStatus" component={RecentStatus} />
            <Stack.Screen name="addStatus" component={AddStatus} />
        </Stack.Navigator>
    )
}