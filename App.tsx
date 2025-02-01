import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import SubmissionScreen from './screens/SubmissionScreen';
import AuthScreen from './screens/AuthScreen'; // Optional: for authentication flow

export type RootStackParamList = {
  Home: undefined;
  Submission: undefined;
  Map: undefined;
  Profile: undefined;
  Auth: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Submission" component={SubmissionScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        {/* Uncomment below if you want to show an auth screen */}
        {/* <Tab.Screen name="Auth" component={AuthScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
} 