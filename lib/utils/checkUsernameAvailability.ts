import { collection, firestore, getDocs } from "services/firebase";

export const getUsernames = async () => {
  const usernames: any[] = [];
  const querySnapshot = await getDocs(collection(firestore, "users"));

  console.log(querySnapshot);

  return usernames;
};

const isAvailableUsername = async (username: string | undefined) => {
  const res = await getUsernames();
  console.log("eren -->", res);
  return false;
};

export default isAvailableUsername;

//const docRef = collection(firestore, "users");
//const docSnap = await getDocs(docRef);
//console.log("eren -->", docSnap);

