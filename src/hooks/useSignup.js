import { ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { auth, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      const imgRef = ref(storage, `images/${thumbnail.name}`);
      uploadBytes(imgRef, thumbnail)
        .then(() => {
          console.log("image uploaded");
        })
        .catch((err) => {
          console.log("something went wrong");
        });
      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgRef });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
