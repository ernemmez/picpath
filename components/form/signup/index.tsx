import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { Button } from "components/Button";
import { Input } from "components/form/form-components";
import { showToast } from "lib/utils/alertHandler";
import { setFirebaseMessages } from "lib/utils/showFirebaseError";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleOutlineIcon from "public/icons/google_outline.svg";
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
        <div className="h-fit m-auto w-7/12 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-medium text-center">Create Account</h2>
            <span className={classNames('my-6 letter-spacing: -0.025em leading-[18px]', { 'text-pp-danger': error })}>{error ? 'Please enter a valid value in all fields' : 'Welcome back to PicPath...'}</span>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center" method="POST">
                    <div className="w-9/12 m-auto">
                        <Controller
                            name="username"
                            render={(props) => (
                                <Input
                                    type="text"
                                    variant="outlined"
                                    label="Username"
                                    className="w-full"
                                    error={errors?.username?.message ? true : false}
                                    {...props.field}
                                />
                            )}
                        />
                        {errors?.username?.message && <span className="text-pp-danger text-xs ml-1">{errors?.username?.message}</span>}
                    </div>
                    <div className="w-9/12 m-auto mt-4">
                        <Controller
                            name="email"
                            render={(props) => (
                                <Input
                                    type="email"
                                    variant="outlined"
                                    label="Email"
                                    className="w-full"
                                    error={errors?.email?.message ? true : false}
                                    {...props.field}
                                />
                            )}
                        />
                        {errors?.email?.message && <span className="text-pp-danger text-xs ml-1">{errors?.email?.message}</span>}
                    </div>
                    <div className="w-9/12 m-auto mt-4">
                        <Controller
                            name="password"
                            render={(props) => (
                                <Input
                                    type="password"
                                    variant="outlined"
                                    label="Password"
                                    className="w-full"
                                    error={errors?.password?.message ? true : false}
                                    {...props.field}
                                />
                            )}
                        />
                        {errors?.password?.message && <span className="text-pp-danger text-xs ml-1">{errors?.password?.message}</span>}
                    </div>
                    <div className="w-9/12 m-auto mt-4">
                        <Controller
                            name="confirmPassword"
                            render={(props) => (
                                <Input
                                    type="password"
                                    variant="outlined"
                                    label="Re-Password"
                                    className="w-full"
                                    error={errors?.confirmPassword?.message ? true : false}
                                    {...props.field}
                                />
                            )}
                        />
                        {errors?.confirmPassword?.message && <span className="text-pp-danger text-xs ml-1">{errors?.confirmPassword?.message}</span>}
                    </div>
                    <div className="w-9/12 m-auto mt-4">
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
                            <Image
                                src={GoogleOutlineIcon}
                                alt="PicPath"
                                width={25}
                                height={25}
                            />
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default SignupForm;