import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { HapticTab } from '@/components/HapticTab';

// Import screens for Home stack
import HomeScreen from '@/screens/HomeScreen';
import AnalyticsScreen from '@/screens/AnalyticsScreen';
import PublicFeedScreen from '@/screens/PublicFeedScreen';
import GroupsScreen from '@/screens/GroupsScreen';

// Import other tab screens
import SubmissionScreen from '@/screens/SubmissionScreen';
import MapScreen from '@/screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen'; // Optional: for authentication flow

export type BottomTabParamList = {
  Home: undefined;
  Submission: undefined;
  Map: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Analytics: undefined;
  PublicFeed: undefined;
  Groups: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Analytics" component={AnalyticsScreen} options={{ title: 'Analytics' }} />
      <HomeStack.Screen name="PublicFeed" component={PublicFeedScreen} options={{ title: 'Public Feed' }} />
      <HomeStack.Screen name="Groups" component={GroupsScreen} options={{ title: 'Groups' }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="Home" 
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => <IconSymbol name="house.fill" size={size} color={color} />,
            tabBarButton: (props) => <HapticTab {...props} />,
          }}
        />
        <Tab.Screen 
          name="Submission" 
          component={SubmissionScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <IconSymbol name="paperplane.fill" size={size} color={color} />,
            tabBarButton: (props) => <HapticTab {...props} />,
          }}
        />
        <Tab.Screen 
          name="Map" 
          component={MapScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <IconSymbol name="map.fill" size={size} color={color} />,
            tabBarButton: (props) => <HapticTab {...props} />,
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <IconSymbol name="person.fill" size={size} color={color} />,
            tabBarButton: (props) => <HapticTab {...props} />,
          }}
        />
        {/* Uncomment below if you want to show an auth screen */}
        {/* <Tab.Screen name="Auth" component={AuthScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
} 