import React, { ReactNode, FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Heading, View, Text, ScrollView } from "native-base";
import { useLogout } from "../hooks/useLogout";

interface Props {
  children: ReactNode;
  title: string;
}

export const Layout: FC<Props> = ({
  children,
  title = "Welcome to React Native",
}) => {
  const { logout } = useLogout();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Heading>{title}</Heading>
        <TouchableOpacity onPress={() => logout()}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
