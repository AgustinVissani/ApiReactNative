import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ListBooks from './screens/ListBooks';
import CreateBook from './screens/CreateBook';

const Stack = createStackNavigator();


function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="CreateBook" component={CreateBook}/>
      <Stack.Screen name="ListBooks" component={ListBooks}/>
    </Stack.Navigator>
  )

}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
