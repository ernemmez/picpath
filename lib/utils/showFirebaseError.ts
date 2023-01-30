import { AuthErrorCodes } from "firebase/auth";

const ppAuthMessages = {
  INVALID_EMAIL: "Email or password is wrong",
  WEAK_PASSWORD: "Password is weak",
  EMAIL_EXISTS: "Email already in use",
};

const setFirebaseMessages = (fbMessage: string | string[] | undefined) => {
  const message = fbMessage.match(/\((.*)\)/)[1];

  switch (message) {
    case AuthErrorCodes.INVALID_EMAIL:
      return ppAuthMessages.INVALID_EMAIL;
    case AuthErrorCodes.INVALID_PASSWORD:
      return ppAuthMessages.INVALID_EMAIL;
    case AuthErrorCodes.EMAIL_EXISTS:
      return ppAuthMessages.EMAIL_EXISTS;
    default:
      return "Something went wrong!";
  }
};

export { setFirebaseMessages };
