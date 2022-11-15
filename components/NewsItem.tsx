import React, { FC, memo } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { setEditedNews } from "../slices/uiSlice";
import { useAppMutate } from "../hooks/useAppMutate";
import { News } from "../types/types";
import { View, Heading } from "native-base";

interface Props {
  news: News;
}

const NewsItem: FC<Props> = ({ news }) => {
  const dispatch = useDispatch();
  const { deleteNewsMutation } = useAppMutate();

  if (deleteNewsMutation.isLoading) {
    return <Heading>Deleting...</Heading>;
  }
  if (deleteNewsMutation.error) {
    return <Heading>Error</Heading>;
  }
  return (
    <>
      <View style={styles.container}>
        <Text>{news.content}</Text>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                setEditedNews({
                  id: news.id,
                  content: news.content,
                })
              );
            }}
            style={styles.icon}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              deleteNewsMutation.mutate(news.id);
            }}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
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

export const NewsItemMemo = memo(NewsItem);
