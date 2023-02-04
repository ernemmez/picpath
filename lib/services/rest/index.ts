import axios from "axios";
import { ILoginCredential, ISignupCredential } from "types/index";

export interface GlobalApiResponse<T> {
  status?: string;
  message?: string;
  userMessage?: string;
  data?: T;
}

export const NextAPI = axios.create({
  baseURL: "https://picpath-eewjg3yej-ernemmez.vercel.app/api",
});

export const signinReq = async (credentials: ILoginCredential) => {
  const result = await NextAPI.post("auth/signin", credentials);
  console.log(result);
  return result;
};

export const signupReq = async (credentials: ISignupCredential) => {
  const result = await NextAPI.post("auth/signup", credentials);
  console.log(result);
  return result;
};
