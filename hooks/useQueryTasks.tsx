import { useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import { useQuery } from "react-query";
import Constants from "expo-constants";

import { useSelector } from "react-redux";
import { getToken } from "../slices/authSlice";
import { Task } from "../types/types";
import { GET_TASKS } from "../queries/queries";

const endpoint = Constants.expoConfig.extra.endPoint;
let graphQLClient: GraphQLClient;

interface TasksRes {
  tasks: Task[];
}

const fetchTasks = async () => {
  const { tasks: data } = await graphQLClient.request<TasksRes>(GET_TASKS);

  return data;
};

export const useQueryTasks = () => {
  const token = useSelector(getToken);

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return useQuery<Task[], Error>({
    queryKey: "tasks",
    queryFn: fetchTasks,
    staleTime: 0,
  });
};
