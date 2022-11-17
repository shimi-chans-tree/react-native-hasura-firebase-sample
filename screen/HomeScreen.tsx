import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { useUserChanged } from "../hooks/useUserChanged";

const HomeScreen = () => {
  const {} = useUserChanged();

  return (
    <View>
      <StatusBar style="auto" />
      <Layout title="Home">
        <Auth />
      </Layout>
    </View>
  );
};

export default HomeScreen;
