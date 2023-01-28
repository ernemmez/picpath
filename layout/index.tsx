import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>With Iron Session</title>
            </Head>
            <h1>Main Layout</h1>

            <main>
                {children}
            </main>
        </>
    )
}