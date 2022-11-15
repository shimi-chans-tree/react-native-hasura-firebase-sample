import { FC, memo } from "react";
import { useAppMutate } from "../hooks/useAppMutate";
import { useSelector, useDispatch } from "react-redux";
import { setEditedNews, selectNews } from "../slices/uiSlice";
import {
  View,
  Text,
  Button,
  Box,
  FormControl,
  Stack,
  Input,
} from "native-base";

const NewsEdit: FC = () => {
  const dispatch = useDispatch();
  const editedNews = useSelector(selectNews);
  const { createNewsMutation, updateNewsMutation } = useAppMutate();

  const submitHandler = () => {
    if (editedNews.id === "") {
      createNewsMutation.mutate(editedNews.content);
    } else {
      updateNewsMutation.mutate(editedNews);
    }
  };

  if (createNewsMutation.error || updateNewsMutation.error) {
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
              defaultValue={editedNews.content}
              placeholder="new news ?"
              onChangeText={(value) => {
                dispatch(setEditedNews({ ...editedNews, content: value }));
              }}
            />
            <FormControl.HelperText>Newsを入力</FormControl.HelperText>
          </Stack>
        </FormControl>
      </Box>
      <Button disabled={!editedNews.content} onPress={submitHandler}>
        {editedNews.id === "" ? "Create" : "Update"}
      </Button>
    </View>
  );
};
export const NewsEditMemo = memo(NewsEdit);
