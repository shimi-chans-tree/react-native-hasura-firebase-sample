import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { Heading, View } from "native-base";
import { Layout } from "../components/Layout";
import { auth } from "../firebaseConfig";

import { NewsListMemo } from "../components/NewsList";
import { NewsEditMemo } from "../components/NewsEdit";
import { TaskListMemo } from "../components/TaskList";
import { TaskEditMemo } from "../components/TaskEdit";

const TasksScreen: FC = () => {
  const user = auth.currentUser;

  return (
    <Layout title="TOP">
      <Text style={styles.email}>Email : {user?.email}</Text>

      <Heading size="md">News</Heading>
      <View>
        <NewsListMemo />
        <NewsEditMemo />
      </View>
      <Heading size="md">Tasks</Heading>

      <View>
        <TaskListMemo />
        <TaskEditMemo />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  email: {
    marginVertical: 10,
  },
  icons: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default TasksScreen;
