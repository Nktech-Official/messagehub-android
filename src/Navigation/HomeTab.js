import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecentChats from '../Components/Home/Chats/Recent';
import RecentStatus from '../Components/Home/Status/RecentStatus';
import RecentCalls from '../Components/Home/Calls/RecentCalls';
const TabNav = createMaterialTopTabNavigator();

export default function HomeTab() {
    return (
        <TabNav.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '600',
                },
                tabBarStyle: {
                    backgroundColor: 'rgba(43, 41, 46, 0.6)',

                    marginTop: -6.1,
                },
                tabBarInactiveTintColor: 'white',
                tabBarActiveTintColor: 'rgba(255, 0, 220, 1)',
                tabBarIndicatorStyle: {
                    backgroundColor: 'rgba(255, 0, 220, 1)',
                },
            }}
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            tabBarPosition="top"
            style={{ backgroundColor: 'transparent' }}>
            <TabNav.Screen
                name="chats"
                component={RecentChats}

            />

            <TabNav.Screen
                name="Status"
                component={RecentStatus}
            />
            <TabNav.Screen
                name="Calls"
                component={RecentCalls}
            />
        </TabNav.Navigator>
    )
}