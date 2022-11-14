import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { unSubMeta } from "./useUserChanged";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { resetEditedTask, resetEditedNews } from "../slices/uiSlice";
import { logoutSuccess } from "../slices/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const logout = async () => {
    if (unSubMeta) {
      unSubMeta();
    }
    await signOut(auth);
    queryClient.removeQueries("tasks");
    queryClient.removeQueries("news");
    dispatch(resetEditedTask());
    dispatch(resetEditedNews());
    dispatch(logoutSuccess());
  };

  return { logout };
};
