import { AuthBanner } from "components/AuthBanner";
import SigninForm from "components/form/signin-form";
import SignupForm from "components/form/signup";
import Layout from "layout";
import { showToast } from "lib/utils/alertHandler";
import { setFirebaseMessages } from "lib/utils/showFirebaseError";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/router";
import Logo from "public/icons/pp_icon.svg";
import { useEffect, useState } from "react";

export default function Auth() {
    const { query } = useRouter();
    const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => { // query param da redirect = x gelirse
        if (query?.redirect) {
            switch (query.redirect) {
                case "signin":
                    return setIsLoginPage(true);
                case "signup":
                    return setIsLoginPage(false);
                case "error":
                    showToast({ type: "error", message: setFirebaseMessages(query.error) });
                    return setError(true);
            }
        }
    }, [query]);

    return (
        <>
            <Head>
                <title>PicPath | Welcome</title>
            </Head>
            <Layout>
                <main className="flex h-screen w-full justify-center items-center">
                    {isLoginPage ? (
                        <>
                            <AuthBanner isLogin={isLoginPage} setIsLogin={setIsLoginPage} />
                            <div className="w-1/2 flex items-center justify-center m-auto">
                                <SigninForm error={error} setError={setError} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-1/2 flex items-center justify-center m-auto">
                                <SignupForm error={error} setError={setError} />
                            </div>
                            <AuthBanner isLogin={isLoginPage} setIsLogin={setIsLoginPage} />
                        </>
                    )}
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="PicPath"
                            width={40}
                            height={40}
                            className="absolute top-5 left-7"
                        />
                    </Link>
                </main>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {}
    }
}