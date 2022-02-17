import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import "../public/mubaha/css/login.css"
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <ToastContainer />
      </SessionProvider>
    </>
  );
}
