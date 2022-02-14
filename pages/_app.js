import "../public/assets/scss/app.scss";
import { ToastContainer } from 'react-toastify';
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </>
  );
}
