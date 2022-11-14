import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const useFirebaseAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const emailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const pwChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const resetInput = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  const toggleMode = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  const authUser = useCallback(async () => {
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        alert(e.message);
      }
      resetInput();
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
      resetInput();
    }
  }, [email, password, isLogin]);

  return {
    email,
    password,
    emailChange,
    pwChange,
    resetInput,
    isLogin,
    toggleMode,
    authUser,
  };
};
