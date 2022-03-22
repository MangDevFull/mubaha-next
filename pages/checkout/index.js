import React from "react";
import CommonLayout from "../../components/shop/CommonLayout";
import CheckoutPage from "../../components/common/CheckoutPage";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import { getSession } from "next-auth/react";
const Checkout = () => {
  return (
    <>
      <HeaderAuthen />
      <CommonLayout parent="home" title="Checkout">
        <CheckoutPage />
      </CommonLayout>
      <Footer />
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);
  const response = await fetch(`${process.env.API_ORDER_URL}/checkout?carts=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + session.accessToken,
    },
  });
  return {
    props: {},
  };
}
