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
  const session = await getSession(context);
  
  const response = await fetch(`${process.env.API_ORDER_URL}/checkout?carts=6238483f9112a91018d68295`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + session.accessToken,
    },
  });
  const data = await response.json();
  console.log(data);
   

  // const data = await response.json();
  // console.log(data);
  return {
    props: {},
  };
}
