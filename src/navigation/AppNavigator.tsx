import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import EditScreen from '../screens/EditScreen';
import ShareScreen from '../screens/ShareScreen';
import { RootStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />
            <Stack.Screen name="Share" component={ShareScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
