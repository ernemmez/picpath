interface ILoginCredential {
  email: string;
  password: string;
}

interface ISignupCredential extends ILoginCredential {}

interface IAuthBanner {
  isLogin: boolean;
  setIsLogin: Function;
}

interface ImaskStyleState {
  left: number;
  right: number;
}

export type {
  ILoginCredential,
  ISignupCredential,
  IAuthBanner,
  ImaskStyleState,
};
