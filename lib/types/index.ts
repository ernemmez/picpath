export interface ILoginCredential {
  email: string;
  password: string;
}

export interface ISignupCredential extends ILoginCredential {}
