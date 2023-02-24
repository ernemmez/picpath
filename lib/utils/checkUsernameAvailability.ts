import { collection, firestore, getDocs } from "services/firebase";

export const getUsernames = async () => {
  const usernames: any = [];
  const querySnapshot = await getDocs(collection(firestore, "users"));

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    usernames.push(doc.data().username);
  });

  return usernames;
};

const isAvailableUsername = async (username: string | undefined) => {
  const res = await getUsernames();
  return !res.includes(username);
};

export default isAvailableUsername;
