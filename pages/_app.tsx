import "../styles/globals.css";

import { UserDeviceProvider } from "context/UserDeviceContext";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { UserAgent } from "next-useragent";
import type { AppProps } from "next/app";
import Head from "next/head";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ ua: UserAgent; session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Find the best spot to take the photo you want with PicPath. Explore different photo spots and view photos taken by others."
        />
        <meta
          name="keywords"
          content="Photo,Photograph,Photo Locations,PicPath,Picture,Best Photo Locations,Photography"
        />
        <meta name="author" content="Eren Emmez" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/favicons/180x180.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicons/16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicons/32x32.png" />
      </Head>
      <UserDeviceProvider value={pageProps.ua}>
        <Component {...pageProps} />
      </UserDeviceProvider>
    </SessionProvider>
  );
}
