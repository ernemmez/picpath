import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/Button";
import { Input } from "components/form/form-components";
import { showToast } from "lib/utils/alertHandler";
import { setFirebaseMessages } from "lib/utils/showFirebaseError";
import { signIn } from "next-auth/react";
import EmailIcon from "public/icons/email-icon.svg";
import GoogleOutlineIcon from "public/icons/google_outline.svg";
import HidePasswordIcon from "public/icons/hide.svg";
import UserIcon from "public/icons/person.svg";
import ShowPasswordIcon from "public/icons/show.svg";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { NextAPI } from "services/rest";
import { SignupSchema } from "../Schemas";

interface ISignUnProps {
    error: boolean;
    setError: (arg: boolean) => any;
}

interface SignupResolver {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const SignupForm = (props: ISignUnProps) => {
    const { error, setError } = props;
    const methods = useForm<SignupResolver>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(SignupSchema)
    });
    const { formState } = methods;
    const { errors } = formState;
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const autoSignin = async (data: any) => {
        return await signIn("credentials", { redirect: true, ...data });
    }


    const onSubmit = async (data: any) => {
        NextAPI.post("auth/signup", data)
            .then((res) => {
                showToast({ type: 'success', message: `Welcome to PicPath ${res.data.username}` });
                return autoSignin({ email: res.data.email, password: res.data.password });
            })
            .catch((err) => {
                showToast({ type: 'error', message: setFirebaseMessages(`(${err.response?.data.code})`) });
                return setError(true);
            })
    }


    return (
        <div className="h-fit m-auto lg:w-7/12 w-full flex flex-col justify-center items-center">
            <h2 className="text-4xl font-medium lg:text-center lg:self-auto self-start lg:ml-0 ml-4 mb-2">Create Account {process.env.NEXT_PUBLIC_NextAPI_BASE_URL}</h2>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center" method="POST">
                    <div className="lg:w-9/12 w-11/12 m-auto mt-4">
                        <Controller
                            name="username"
                            render={(props) => (
                                <Input
                                    type="text"
                                    variant="outlined"
                                    label="Username"
                                    className="w-full"
                                    icon={<UserIcon />}
                                    error={errors?.username?.message ? true : false}
                                    {...props.field}
                                />
                            )}
                        />
                        {errors?.username?.message && <span className="text-pp-danger text-xs ml-1">{errors?.username?.message}</span>}
                    </div>
                    <div className="lg:w-9/12 w-11/12 m-auto mt-6">
                        <Controller
                            name="email"
                            render={(props) => (
                                <Input
                                    type="email"
                                    variant="outlined"
                                    label="Email"
                                    className="w-full"
                                    icon={<EmailIcon />}
                                    error={errors?.email?.message ? true : false}
                                    {...props.field}
                                />
                            )}
                        />
                        {errors?.email?.message && <span className="text-pp-danger text-xs ml-1">{errors?.email?.message}</span>}
                    </div>
                    <div className="lg:w-9/12 w-11/12 m-auto mt-6">
                        <Controller
                            name="password"
                            render={(props) => (
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    label="Password"
                                    className="w-full"
                                    error={errors?.password?.message ? true : false}
                                    icon={!showPassword ? <ShowPasswordIcon onClick={() => setShowPassword(true)} /> : <HidePasswordIcon onClick={() => setShowPassword(false)} />}
                                    {...props.field}
                                />
                            )}
                        />
                        {errors?.password?.message && <span className="text-pp-danger text-xs ml-1">{errors?.password?.message}</span>}
                    </div>
                    <div className="lg:w-9/12 w-11/12 m-auto mt-6">
                        <Controller
                            name="confirmPassword"
                            render={(props) => (
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    label="Re-Password"
                                    className="w-full"
                                    error={errors?.confirmPassword?.message ? true : false}
                                    icon={!showPassword ? <ShowPasswordIcon onClick={() => setShowPassword(true)} /> : <HidePasswordIcon onClick={() => setShowPassword(false)} />}
                                    {...props.field}
                                />
                            )}
                        />
                        {errors?.confirmPassword?.message && <span className="text-pp-danger text-xs ml-1">{errors?.confirmPassword?.message}</span>}
                    </div>
                    <div className="lg:w-9/12 w-11/12 m-auto mt-6">
                        <Button
                            type="submit"
                            variant="filled"
                            className="w-full h-[39px] bg-pp-secondary-green shadow-0 hover:shadow-0"
                        >
                            sign up
                        </Button>
                        <Button
                            onClick={(_e: any) => alert('Google Login')}
                            variant="outlined"
                            className="w-full h-[39px] shadow-0 hover:shadow-0 mt-3 flex justify-center items-center border border-pp-secondary-green outline-none focus:outline-none"
                        >
                            <GoogleOutlineIcon />
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default SignupForm;