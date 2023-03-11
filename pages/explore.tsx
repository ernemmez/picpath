import Header from "components/Header";
import PpMap from "components/Map";
import { useUserDevice } from "context/UserDeviceContext";
import Layout from "layout";
import type { NextPage } from 'next';
import { useSession } from "next-auth/react";
import { useUserAgent } from "next-useragent";
import Head from "next/head";

interface IExplore {
    searchResult: any[];
}

const Explore: NextPage<IExplore> = ({ searchResult }) => {
    const { data } = useSession();
    const { isMobile } = useUserDevice();

    return (
        <>
            <Head>
                <title>PicPath | Explore</title>
                <meta name="description" content="Picture path" />
            </Head>
            <Layout>
                <Header isMobile={isMobile} />
                <main className="w-full h-screen">
                    <PpMap searchResults={searchResult} />
                </main>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const res = await fetch(`http://localhost:3000/api/search`);
    const data = await res.json();

    return {
        props: {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            ua: useUserAgent(context.req.headers["user-agent"]),
            searchResult: data?.data,
        },
    };
}

export default Explore;