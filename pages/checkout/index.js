import React from "react";
import CommonLayout from "../../components/shop/CommonLayout";
import CheckoutPage from "../../components/common/CheckoutPage";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
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
