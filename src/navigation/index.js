import * as React from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../global/Theme';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Settings from '../screens/Settings';
import History from '../screens/History';
import Logs from '../screens/Logs';


const StackNavation = createNativeStackNavigator();

export default function StackNavationScreens() {
  return (
    <NavigationContainer >
        <StatusBar
        animated={true}
        backgroundColor={colors.primary}
       />
    <StackNavation.Navigator  initialRouteName='Splash'
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavation.Screen name="Splash" component={Splash} />
      <StackNavation.Screen name="Main" component={App} />
      <StackNavation.Screen name="Login" component={Login} />
      <StackNavation.Screen name="SignUp" component={SignUp} />
      <StackNavation.Screen name="Profile" component={Profile} />
      <StackNavation.Screen name="Logs" component={Logs} />
      {/* <StackNavation.Screen name="History" component={History} /> */}
    </StackNavation.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator();

 function App() {
  return (
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.success,
          tabBarInactiveTintColor: colors.secondary,
          // activeTintColor: '#fff',
          // inactiveTintColor: 'lightgray',
          // activeBackgroundColor: '#c4461c',
          // inactiveBackgroundColor: '#b55031',
          tabBarStyle: {
            height: 60,
            paddingHorizontal: 5,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: colors.primary,
            // position: 'absolute',
            borderTopWidth: 0,
        },
        }}
        >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons name={focused ? "pulse" : "pulse-outline"} color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons name={focused ? "reorder-four" : "reorder-four-outline"} color={color} size={size} />
            ),
          }}
        />

 <BottomTab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons name={focused ? "cog" : "cog-outline"} color={color} size={size} />
            ),
          }}
        />

     
      </BottomTab.Navigator>
  );
}
