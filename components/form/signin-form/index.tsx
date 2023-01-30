import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/Button";
import { Input } from "components/form/form-components";
import { showToast } from "lib/utils/alertHandler";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleOutlineIcon from "public/icons/google_outline.svg";
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
        <div className="h-fit m-auto w-7/12 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-medium text-center">Sign In to PicPath</h2>
            <span className="my-6 letter-spacing: -0.025em leading-[18px]">Welcome back to PicPath...</span>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center" method="POST">
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
                    <div className="w-9/12 m-auto mt-6">
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

export default SigninForm;