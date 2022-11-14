import React from "react";

import { NativeBaseProvider } from "native-base";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Provider } from "react-redux";
import { store } from "./app/store";

import RootNavigator from "./navigations/RootNavigator";

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NativeBaseProvider>
          <RootNavigator />
        </NativeBaseProvider>
      </Provider>
    </QueryClientProvider>
  );
}
