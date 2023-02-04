import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/Button";
import { Input } from "components/form/form-components";
import { showToast } from "lib/utils/alertHandler";
import { signIn } from "next-auth/react";
import EmailIcon from "public/icons/email-icon.svg";
import GoogleOutlineIcon from "public/icons/google_outline.svg";
import HidePasswordIcon from "public/icons/hide.svg";
import ShowPasswordIcon from "public/icons/show.svg";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { SigninSchema } from "../Schemas";


export interface ISignInProps {
    error: boolean;
    setError: (arg: boolean) => any;
}

interface SigninResolver {
    email: string;
    password: string;
}

const SigninForm = (props: ISignInProps) => {
    const { error, setError } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const methods = useForm<SigninResolver>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(SigninSchema)
    });
    const { formState } = methods;
    const { errors } = formState;


    const onSubmit = async (data: any) => {
        const res = await signIn("credentials", { redirect: true, ...data })

        if (res) {
            return showToast({ type: 'success', message: `Welcome again to PicPath` });
        }
        return setError(true);
    }

    return (
        <div className="h-fit m-auto lg:w-7/12 w-full flex flex-col justify-center items-center">
            <h2 className="text-4xl font-medium lg:text-center lg:self-auto self-start lg:ml-0 ml-4 mb-4">Sign In to PicPath</h2>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center" method="POST">
                    <div className="lg:w-9/12 w-11/12 m-auto mt-4">
                        <Controller
                            name="email"
                            render={(props) => (
                                <Input
                                    type="email"
                                    variant="outlined"
                                    label="Email"
                                    className="w-full"
                                    error={errors?.email?.message ? true : false}
                                    icon={<EmailIcon />}
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
                        <Button
                            type="submit"
                            variant="filled"
                            className="w-full h-[39px] bg-pp-secondary-green shadow-0 hover:shadow-0"
                        >
                            sign in
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

export default SigninForm;