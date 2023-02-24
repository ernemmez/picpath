import { useEffect, useState } from "react";

import { AuthBanner } from "components/AuthBanner";
import SigninForm from "components/form/signin-form";
import SignupForm from "components/form/signup";
import { useUserDevice } from "context/UserDeviceContext";
import Layout from "layout";
import { showToast } from "lib/utils/alertHandler";
import { setFirebaseMessages } from "lib/utils/showFirebaseError";
import { useUserAgent } from "next-useragent";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Auth() {
  const { query } = useRouter();
  const { isMobile } = useUserDevice();
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // query param da redirect = x gelirse
    if (query?.redirect) {
      switch (query.redirect) {
        case "signin":
          return setIsLoginPage(true);
        case "signup":
          return setIsLoginPage(false);
        case "error":
          showToast({
            type: "error",
            message: setFirebaseMessages(query.error),
          });
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
        {isMobile ? (
          <main className="w-full h-full">
            {isLoginPage ? (
              <>
                <AuthBanner
                  isMobile={isMobile}
                  isLogin={isLoginPage}
                  setIsLogin={setIsLoginPage}
                />
                <div className="mt-24 flex flex-col items-center justify-start m-auto">
                  <SigninForm error={error} setError={setError} />
                  <span className="mt-12">
                    Don’t have an account?&nbsp;
                    <span className="text-pp-link underline">
                      <Link href="/auth?redirect=signup">Sign up</Link>
                    </span>
                    &nbsp;for free!
                  </span>
                </div>
              </>
            ) : (
              <>
                <AuthBanner
                  isMobile={isMobile}
                  isLogin={isLoginPage}
                  setIsLogin={setIsLoginPage}
                />
                <div className="mt-24 flex flex-col items-center justify-start m-auto">
                  <SignupForm error={error} setError={setError} />
                  {isLoginPage ? (
                    <span className="mt-12">
                      Don’t have an account?&nbsp;
                      <span className="text-pp-link underline">
                        <Link href="/auth?redirect=signup">Sign up</Link>
                      </span>
                      &nbsp;for free!
                    </span>
                  ) : (
                    <span className="mt-12">
                      Do you have an account?&nbsp;
                      <span className="text-pp-link underline">
                        <Link href="/auth?redirect=signin">Sign in</Link>
                      </span>
                      &nbsp;now!
                    </span>
                  )}
                </div>
              </>
            )}
            <div
              className="w-full h-[220px] absolute bottom-0 z-[-2]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(9,118,111,0.6432948179271709) 0%, rgba(9,98,118,0.4192051820728291) 33%, rgba(9,98,118,0.23713235294117652) 59%, rgba(9,98,118,0) 100%)",
                transform: "rotate(180deg)",
              }}
            ></div>
          </main>
        ) : (
          <main className="flex h-screen w-full justify-center items-center">
            {isLoginPage ? (
              <>
                <AuthBanner
                  isLogin={isLoginPage}
                  setIsLogin={setIsLoginPage}
                  isMobile={isMobile}
                />
                <div className="w-1/2 flex items-center justify-center m-auto">
                  <SigninForm error={error} setError={setError} />
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2 flex items-center justify-center m-auto">
                  <SignupForm error={error} setError={setError} />
                </div>
                <AuthBanner
                  isLogin={isLoginPage}
                  setIsLogin={setIsLoginPage}
                  isMobile={isMobile}
                />
              </>
            )}
            <Link href="/">
              <Image
                src="/icons/pp_icon.svg"
                alt="PicPath"
                width={44}
                height={44}
                className="absolute top-5 left-7"
              />
            </Link>
          </main>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      ua: useUserAgent(context.req.headers["user-agent"]),
    },
  };
}
