import { FC, memo } from "react";
import {
  View,
  Text,
  Button,
  Box,
  FormControl,
  Stack,
  Input,
} from "native-base";
import { useAppMutate } from "../hooks/useAppMutate";
import { useSelector, useDispatch } from "react-redux";
import { setEditedTask, selectTask } from "../slices/uiSlice";

const TaskEdit: FC = () => {
  const dispatch = useDispatch();
  const editedTask = useSelector(selectTask);
  const { createTaskMutation, updateTaskMutation } = useAppMutate();

  const submitHandler = () => {
    if (editedTask.id === "") {
      createTaskMutation.mutate(editedTask.title);
    } else {
      updateTaskMutation.mutate(editedTask);
    }
  };

  if (createTaskMutation.error || updateTaskMutation.error) {
    return <Text>{"Error"}</Text>;
  }

  return (
    <View>
      <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Edit</FormControl.Label>
            <Input
              type="text"
              defaultValue={editedTask.title}
              placeholder="new news ?"
              onChangeText={(value) => {
                dispatch(setEditedTask({ ...editedTask, title: value }));
              }}
            />
            <FormControl.HelperText>Taskを入力</FormControl.HelperText>
          </Stack>
        </FormControl>
      </Box>
      <Button disabled={!editedTask.title} onPress={submitHandler}>
        {editedTask.id === "" ? "Create" : "Update"}
      </Button>
    </View>
  );
};

export const TaskEditMemo = memo(TaskEdit);
