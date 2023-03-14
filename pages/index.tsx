import { Button } from "@material-tailwind/react";
import Header from "components/Header";
import { useUserDevice } from "context/UserDeviceContext";
import Layout from "layout";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useUserAgent } from "next-useragent";
import Head from "next/head";

const Home: NextPage = () => {
  const { data } = useSession();
  const { isMobile } = useUserDevice();
  return (
    <>
      <Head>
        <title>PicPath | Welcome</title>
        <meta name="description" content="Picture path" />
      </Head>
      <Layout>
        <main>
          <Header isMobile={isMobile} />
          <section className="w-1/2 m-auto flex justify-around items-center mt-10">
            <Button onClick={() => signOut()} variant="outlined">
              Sign out
            </Button>
          </section>
        </main>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      ua: useUserAgent(context.req.headers["user-agent"]),
    },
  };
}

export default Home;
