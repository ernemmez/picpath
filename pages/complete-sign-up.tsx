import CompleteSignUpWizard from "components/CompleteSignUpWizard";
import { useUserDevice } from "context/UserDeviceContext";
import Layout from "layout";
import { useSession } from "next-auth/react";
import { useUserAgent } from "next-useragent";
import BannerIMG from "public/auth-complete-banner.png";

export default function CompleteSignUp() {
  const { data } = useSession();
  const { isMobile } = useUserDevice();

  console.log(data);
  return (
    <Layout>
      <div className="flex">
        <div
          className="w-full justify-center lg:justify-start lg:w-3/5 h-screen flex flex-col lg:px-28 lg:pt-60"
          style={{
            background: `${
              isMobile
                ? "linear-gradient(180deg, rgba(9,118,111,1) 0%, rgba(255,255,255,0) 10%), linear-gradient(0deg, rgba(9,118,111,1) 0%, rgba(255,255,255,0) 10%"
                : ""
            }`,
          }}
        >
          <CompleteSignUpWizard />
        </div>
        {!isMobile && (
          <div
            className="w-2/5 h-screen bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url('${BannerIMG.src}')`,
            }}
          ></div>
        )}
      </div>
    </Layout>
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
