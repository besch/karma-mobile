import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import AnalyticsScreen from '@/screens/AnalyticsScreen';
import PublicFeedScreen from '@/screens/PublicFeedScreen';
import GroupsScreen from '@/screens/GroupsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      <Stack.Screen name="PublicFeed" component={PublicFeedScreen} />
      <Stack.Screen name="Groups" component={GroupsScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;