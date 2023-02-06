import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const session = useSession();
    console.log(session)

    useEffect(() => {
        if (router.route === '/auth' && session.data != null || undefined) {
            router.push('/');
        }
    }, [router.route, session.data])

    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}