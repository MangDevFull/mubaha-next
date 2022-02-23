import Layout from "@/components/Layout";
import ErrorPage from "@/components/errors/ErrorPage"

export default function Custom404() {
  return (
    <ErrorPage title="404" message="Không có gì ở đây" />
  )
}

Custom404.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};