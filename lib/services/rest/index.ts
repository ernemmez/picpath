import axios from "axios";
import { ILoginCredential, ISignupCredential } from "types/index";

export interface GlobalApiResponse<T> {
  status?: string;
  message?: string;
  userMessage?: string;
  data?: T;
}

export const NextAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_NextAPI_BASE_URL}`,
});

export const signinReq = async (credentials: ILoginCredential) => {
  const result = await NextAPI.post("auth/signin", credentials);

  return result;
};

export const signupReq = async (credentials: ISignupCredential) => {
  const result = await NextAPI.post("auth/signup", credentials);

  return result;
};
