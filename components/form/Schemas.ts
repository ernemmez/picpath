import isAvailableUsername from "lib/utils/checkUsernameAvailability";
import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Please enter a username")
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._]+$/,
      "Your username can only contain letters, numbers and underscores. Cannot be longer than 15 characters"
    )
    .test(
      "usernameAvaibility",
      "This username has already been taken",
      function (username) {
        return isAvailableUsername(username);
      }
    ),
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .min(6, "Your password must contain at least 6 characters")
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])/,
      "Your password must contain one lowercase character"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Your password must contain at least one uppercase character"
    )
    .matches(
      /^(?=.*[0-9])/,
      "Your password must contain at least one number character"
    )
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Your password must contain at least one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Please verify your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const SigninSchema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});
