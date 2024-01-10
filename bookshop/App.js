import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CreateBook from "./screens/CreateBook";
import CreateForms from "./screens/CreateForms";
import EditBook from "./screens/EditBook";
import ListBooks from "./screens/ListBooks";
import { BooksProvider } from './screens/BooksContext';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="List Books" component={ListBooks} />
      <Stack.Screen name="Create Forms" component={CreateForms} />
      <Stack.Screen name="Create Book" component={CreateBook} />
      <Stack.Screen name="Edit Book" component={EditBook} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BooksProvider>
        <MyStack />
      </BooksProvider>
    </NavigationContainer>
  );
}
