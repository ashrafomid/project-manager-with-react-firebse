import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { ref, uploadBytes } from "firebase/storage";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCanceled, setIsCanceled] = useState(false);
  const signUp = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
    try {
      //signup user

      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not create an account for this user");
      } else {
        const imgRef = ref(storage, `images/${thumbnail.name}`);
        uploadBytes(imgRef, thumbnail)
          .then(() => {
            console.log("image uploaded");
            updateProfile(auth.currentUser, {
              displayName,
              photoURL: imgRef,
            })
              .then(() => console.log("updated"))
              .catch((err) => console.log(err.message));
          })
          .catch((err) => {
            console.log("something went wrong");
          });

        //dispatch user login
        dispatch({ type: "LOGIN", payload: res.user });
        if (!isCanceled) {
          setError(null);
          setIsPending(false);
        }
      }
    } catch (err) {
      if (!isCanceled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsCanceled(true);
    };
  }, []);
  return { error, isPending, signUp };
};
// import { ref, uploadBytes } from "firebase/storage";
// import { useState, useEffect } from "react";
// import { auth, storage } from "../firebase/config";
// import { useAuthContext } from "./useAuthContext";

// export const useSignup = () => {
//   const [isCancelled, setIsCancelled] = useState(false);
//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const { dispatch } = useAuthContext();

//   const signup = async (email, password, displayName) => {
//     setError(null);
//     setIsPending(true);

//     try {
//       // signup
//       const res = await auth.createUserWithEmailAndPassword(email, password);

//       if (!res) {
//         throw new Error("Could not complete signup");
//       }

//       // const imgRef = ref(storage, `images/${thumbnail.name}`);
//       // uploadBytes(imgRef, thumbnail)
//       //   .then(() => {
//       //     console.log("image uploaded");
//       //   })
//       //   .catch((err) => {
//       //     console.log("something went wrong");
//       //   });
//       // add display name to user
//       await res.user.updateProfile({ displayName });

//       // dispatch login action
//       dispatch({ type: "LOGIN", payload: res.user });

//       if (!isCancelled) {
//         setIsPending(false);
//         setError(null);
//       }
//     } catch (err) {
//       if (!isCancelled) {
//         setError(err.message);
//         setIsPending(false);
//       }
//     }
//   };

//   useEffect(() => {
//     return () => setIsCancelled(true);
//   }, []);

//   return { signup, error, isPending };
// };
