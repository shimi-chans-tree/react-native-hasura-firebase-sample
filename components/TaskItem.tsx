import { FC, memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setEditedTask } from "../slices/uiSlice";
import { useAppMutate } from "../hooks/useAppMutate";
import { Task } from "../types/types";

interface Props {
  task: Task;
}

const TaskItem: FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  const { deleteTaskMutation } = useAppMutate();
  if (deleteTaskMutation.isLoading) {
    return <Text>Deleting...</Text>;
  }
  if (deleteTaskMutation.error) {
    return <Text>Error</Text>;
  }
  return (
    <View style={styles.container}>
      <Text>{task.title}</Text>
      <View style={styles.icons}>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setEditedTask({
                id: task.id,
                title: task.title,
              })
            );
          }}
          style={styles.icon}
        >
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteTaskMutation.mutate(task.id);
          }}
        >
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export const TaskItemMemo = memo(TaskItem);
