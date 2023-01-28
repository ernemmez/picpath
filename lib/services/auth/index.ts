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

const addUser = async (credentials: ILoginCredential) => {
  const { email, password } = credentials;
  const coreUser = await createUserWithEmailAndPassword(auth, email, password);
  try {
    return await setDoc(doc(firestore, "users", `${coreUser.user.uid}`), {
      uid: coreUser.user.uid,
      email: coreUser.user.email,
    });
  } catch (e) {
    return { message: "Error adding Firestore Doc", error: e };
  }
};

const authenticate = async (credentials: ISignupCredential) => {
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
