import classNames from "classnames";
import { Button } from "components/Button";
import { Input } from "components/form/form-components";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleOutlineIcon from "public/icons/google_outline.svg";
import { useState } from "react";

interface ISignInProps {
    error: boolean;
    setError: (arg: boolean) => any;
}



const SigninForm = (props: ISignInProps) => {
    const { error, setError } = props;
    const [formVal, setFormVal] = useState<any>({
        email: null,
        password: null
    });


    const handleSubmit = async () => {
        const { email, password } = formVal;

        if (email && password) {
            return await signIn("credentials", { email, password, redirect: false, callbackUrl: "/" });
        }
        return setError(true);
    }

    return (
        <div className="h-fit m-auto w-7/12 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-medium text-center">Sign In to PicPath</h2>
            <span className={classNames('my-6 letter-spacing: -0.025em leading-[18px]', { 'text-pp-danger': error })}>{error ? 'Email or password is wrong' : 'Welcome back to PicPath...'}</span>
            <div className="w-9/12 m-auto">
                <Input
                    type="email"
                    variant="outlined"
                    label="Email"
                    onChange={(e: any) => {
                        setFormVal({ ...formVal, email: e.target.value })
                    }}
                    className="w-full"
                />
            </div>
            <div className="w-9/12 m-auto mt-6">
                <Input type="password" variant="outlined" label="Password" onChange={(e: any) => {
                    setFormVal({ ...formVal, password: e.target.value })
                }} />
            </div>
            <div className="w-9/12 m-auto mt-6">
                <Button
                    onClick={(_e: any) => handleSubmit()}
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
        </div>
    )
}

export default SigninForm;