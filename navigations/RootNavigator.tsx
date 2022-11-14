import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import TasksScreen from "../screen/TasksScreen";
import { useUserChanged } from "../hooks/useUserChanged";

import { RootState } from "../app/store";
import LoadingScreen from "../screen/LoadingScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {} = useUserChanged();

  const { isLoanching, token } = useSelector((state: RootState) => state.auth);

  if (isLoanching) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen name="Tasks" component={TasksScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
