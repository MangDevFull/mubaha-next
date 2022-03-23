import React, { useContext, useState, useEffect } from "react";
import CommonLayout from "../../components/shop/CommonLayout";
import CheckoutPage from "../../components/common/CheckoutPage";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import { getSession, useSession } from "next-auth/react";

const Checkout = (data) => {
  const { data: session } = useSession();
  const [showVoucher, setShowVoucher] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [vouchers, setVouchers] = useState([]);
  const handleVoucherShow = async () => {
    setShowVoucher(true);
    try {
      const response = await fetch(`${process.env.API_VOUCHER_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
      });
      const data = await response.json();
      const newVouchers = data.data;
      setVouchers(newVouchers);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseVoucher = () => {
    setShowVoucher(false);
  };
  const handleApplyVoucher = (voucher) => {
    handleCloseVoucher();
    console.log(voucher)
  }
  const handleSelectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value)
    console.log(e)
    
  }
  return (
    <>
      <HeaderAuthen />
      <CommonLayout parent="home" title="Checkout">
        <CheckoutPage
          data={data}
          handleVoucherShow={handleVoucherShow}
          handleCloseVoucher={handleCloseVoucher}
          showVoucher={showVoucher}
          vouchers={vouchers}
          handleApplyVoucher={handleApplyVoucher}
          handleSelectPaymentMethod={handleSelectPaymentMethod}
        />
      </CommonLayout>
      <Footer />
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const response = await fetch(
    `${process.env.API_ORDER_URL}/checkout?carts=6238483f9112a91018d68295`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
    }
  );
  const { data } = await response.json();
  return {
    props: {
      data,
    },
  };
}
