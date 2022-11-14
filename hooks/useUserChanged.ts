import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { loginSuccess } from "../slices/authSlice";

export let unSubMeta: () => void;

export const useUserChanged = () => {
  const dispatch = useDispatch();

  const HASURA_TOKEN_KEY = "https://hasura.io/jwt/claims";
  useEffect(() => {
    console.log("login start");
    const unSubUser = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaims = idTokenResult.claims[HASURA_TOKEN_KEY];
        if (hasuraClaims) {
          dispatch(loginSuccess(token));
        } else {
          unSubMeta = onSnapshot(doc(db, "user_meta", user.uid), async () => {
            const tokenSnap = await user.getIdToken(true);
            const idTokenResultSnap = await user.getIdTokenResult();
            const hasuraClaimsSnap = idTokenResultSnap.claims[HASURA_TOKEN_KEY];

            if (hasuraClaimsSnap) {
              dispatch(loginSuccess(tokenSnap));
            }
          });
        }
      } else {
        dispatch(loginSuccess(""));
      }
    });
    return () => {
      unSubUser();
    };
  }, [dispatch]);
  return {};
};
