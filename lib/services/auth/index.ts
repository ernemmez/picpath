import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  firestore,
  getDoc,
  setDoc,
  signInWithEmailAndPassword,
} from "services/firebase";
import { ILoginCredential, ISignupCredential } from "types/index";

const addUser = async (credentials: ISignupCredential) => {
  const { email, password, username } = credentials;
  try {
    const coreUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(firestore, "users", `${coreUser.user.uid}`), {
      uid: coreUser.user.uid,
      email: coreUser.user.email,
      username,
    });
    const docRef = doc(firestore, "users", `${coreUser.user.uid}`);
    const docSnap = await getDoc(docRef);

    return docSnap.exists()
      ? {
          username: docSnap.data().username,
          email: docSnap.data().email,
          password,
        }
      : { err: "somethig went wrong" };
  } catch (e) {
    return e;
  }
};

const authenticate = async (credentials: ILoginCredential) => {
  const { email, password } = credentials;
  const coreUser = await signInWithEmailAndPassword(auth, email, password);
  if (coreUser) {
    const docRef = doc(firestore, "users", `${coreUser.user.uid}`);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : false;
  }

  return false;
};

export { addUser, authenticate };
