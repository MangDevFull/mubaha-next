import Layout from "../components/Layout";
import ErrorPage from "../components/errors/ErrorPage"

export default function Custom404() {
  return (
    <ErrorPage title="500" message="Chúng tôi đang xử lý vấn đề này" />
  )
}

Custom404.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};