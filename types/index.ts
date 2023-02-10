interface ILoginCredential {
  email: string;
  password: string;
}

interface ISignupCredential extends ILoginCredential {
  username: string;
}

interface IAuthBanner {
  isLogin: boolean;
  setIsLogin: Function;
  isMobile?: boolean;
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
