import Head from "next/head";
import Layout from "@/components/Layout";
import CommonLayout from "../components/shop/CommonLayout";

const Account = () => {
  return (
    <>
    <CommonLayout parent="Trang chủ" title="Tài khoản">
      </CommonLayout>
    </>
  )
}

Account.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Account;