import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQueryClient, useMutation } from "react-query";
import { GraphQLClient } from "graphql-request";
import Constants from "expo-constants";

import {
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  CREATE_NEWS,
  DELETE_NEWS,
  UPDATE_NEWS,
} from "../queries/queries";
import { Task, EditTask, News, EditNews } from "../types/types";
import { resetEditedTask, resetEditedNews } from "../slices/uiSlice";
import { RootState } from "../app/store";

const endpoint = Constants.expoConfig.extra.endPoint;
let graphQLClient: GraphQLClient;

export const useAppMutate = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  const createTaskMutation = useMutation(
    (title: string) => graphQLClient.request(CREATE_TASK, { title: title }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData("tasks", [
            ...previousTodos,
            res.insert_tasks_one,
          ]);
        }
        dispatch(resetEditedTask());
      },
      onError: () => {
        dispatch(resetEditedTask());
      },
    }
  );
  const updateTaskMutation = useMutation(
    (task: EditTask) => graphQLClient.request(UPDATE_TASK, task),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            previousTodos.map((task) =>
              task.id === variables.id ? res.update_tasks_by_pk : task
            )
          );
        }
        dispatch(resetEditedTask());
      },
      onError: () => {
        dispatch(resetEditedTask());
      },
    }
  );
  const deleteTaskMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_TASK, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            previousTodos.filter((task) => task.id !== variables)
          );
        }
        dispatch(resetEditedTask());
      },
    }
  );
  const createNewsMutation = useMutation(
    (content: string) =>
      graphQLClient.request(CREATE_NEWS, { content: content }),
    {
      onSuccess: (res) => {
        const previousNews = queryClient.getQueryData<News[]>("news");
        if (previousNews) {
          queryClient.setQueryData("news", [
            ...previousNews,
            res.insert_news_one,
          ]);
        }
        dispatch(resetEditedNews());
      },
      onError: () => {
        dispatch(resetEditedNews());
      },
    }
  );
  const updateNewsMutation = useMutation(
    (news: EditNews) => graphQLClient.request(UPDATE_NEWS, news),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>("news");
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            "news",
            previousNews.map((news) =>
              news.id === variables.id ? res.update_news_by_pk : news
            )
          );
        }
        dispatch(resetEditedNews());
      },
      onError: () => {
        dispatch(resetEditedNews());
      },
    }
  );
  const deleteNewsMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_NEWS, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>("news");
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            "news",
            previousNews.filter((news) => news.id !== variables)
          );
        }
        dispatch(resetEditedNews());
      },
    }
  );
  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createNewsMutation,
    updateNewsMutation,
    deleteNewsMutation,
  };
};
