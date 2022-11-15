import { View, Text } from "native-base";
import { FC, memo } from "react";
import { useQueryNews } from "../hooks/useQueryNews";
import { NewsItemMemo } from "./NewsItem";

const NewsList: FC = () => {
  const { status, data } = useQueryNews();

  if (status === "loading") return <Text>{"Loading..."}</Text>;
  if (status === "error") return <Text>{"Error"}</Text>;

  return (
    <View>
      {data?.map((news) => (
        <NewsItemMemo key={news.id} news={news} />
      ))}
    </View>
  );
};
export const NewsListMemo = memo(NewsList);
