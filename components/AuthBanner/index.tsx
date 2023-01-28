import { Button } from "@material-tailwind/react";
import classNames from "classnames";
import bgImageDown from "public/auth-banner-down.png";
import bgImageUp from "public/auth-banner-up.png";
import { FC } from "react";
import { IAuthBanner } from "types";


export const AuthBanner: FC<IAuthBanner> = ({ isLogin, setIsLogin }) => {

    return (
        <div className={classNames("bg-cover lg:w-7/12 lg:h-screen flex flex-col justify-center items-center", {
            'rounded-l-[80px]': !isLogin,
            'rounded-r-[80px]': isLogin,
        })} style={{ backgroundImage: `url('${isLogin ? bgImageUp.src : bgImageDown.src}')` }}>
            <div className="w-4/10 text-center text-white">
                <h1 className="text-7xl font-medium leading-[150%]" style={{ textShadow: "2px 1px 0px rgba(0, 0, 0, 0.25)" }}>
                    {isLogin ? 'Welcome Back!' : 'Hello, Friend'}
                </h1>
                <p className="w-3/5 m-auto text-base" style={{ textShadow: "2px 1px 0px rgba(0, 0, 0, 0.25)" }}>
                    Lorem Ipsum is simply dummy
                    text of the printing and typesetting industry.
                </p>
                <Button className="mt-11 w-36 bg-pp-secondary-green max-w-36 max-h-[39px] shadow-none hover:shadow-none" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'sign up' : 'sign in'}
                </Button>
            </div>
        </div>
    );
}