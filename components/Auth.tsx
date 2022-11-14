import { FC } from "react";
import {
  Box,
  FormControl,
  Stack,
  Input,
  WarningOutlineIcon,
  Button,
} from "native-base";

import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

export const Auth: FC = () => {
  const {
    isLogin,
    email,
    password,
    emailChange,
    pwChange,
    authUser,
    toggleMode,
  } = useFirebaseAuth();

  return (
    <>
      <Box alignItems="center">
        <Box w="100%" maxWidth="300px">
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="text"
                defaultValue="example@example.com"
                placeholder="example@example.com"
                value={email}
                onChangeText={emailChange}
              />
              <FormControl.HelperText>Email</FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                defaultValue="12345"
                placeholder="password"
                value={password}
                onChangeText={pwChange}
              />
              <FormControl.HelperText>
                Must be atleast 6 characters.
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
            </Stack>
            <Button disabled={!email || !password} onPress={authUser}>
              {isLogin ? "Login" : "Register"}
            </Button>
          </FormControl>

          <Button onPress={toggleMode}>切り替え</Button>
        </Box>
      </Box>
    </>
  );
};
