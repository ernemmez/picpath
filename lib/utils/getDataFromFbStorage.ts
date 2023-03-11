import { fbStorage, fbStorageRef, getDownloadURL } from "services/firebase";

export const getAsset = async (path: string | undefined) => {
  const res = await getDownloadURL(fbStorageRef(fbStorage, `assets/${path}`));
  const image = await res;

  return image;
};
