import { FC, memo } from "react";
import { View, Text } from "native-base";
import { useQueryTasks } from "../hooks/useQueryTasks";
import { TaskItemMemo } from "./TaskItem";

const TaskList: FC = () => {
  const { status, data } = useQueryTasks();

  if (status === "loading") return <Text>{"Loading..."}</Text>;
  if (status === "error") return <Text>{"Error"}</Text>;
  return (
    <View>
      {data?.map((task) => (
        <TaskItemMemo key={task.id} task={task} />
      ))}
    </View>
  );
};
export const TaskListMemo = memo(TaskList);
