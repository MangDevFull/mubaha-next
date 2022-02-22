import Layout from "../../components/Layout";

export default function VendorAuthen(){
  return (
    <>
    <h1>Login vendor</h1>
  </>
  )
}

VendorAuthen.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}