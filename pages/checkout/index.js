import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import CommonLayout from "../../components/shop/CommonLayout";
import CheckoutPage from "../../components/common/CheckoutPage";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import _ from 'lodash'
import { getSession, useSession } from "next-auth/react";

const Checkout = ({ data }) => {
  console.log("cartItems", data)
  const { data: session } = useSession();
  const [showVoucher, setShowVoucher] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState();
  // const [Items, setItems] = useState(cartItems.docs);
  const [listAddress, setListAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();

  useEffect(() => {
    if (session) handleGetListAddress();
  }, [session]);

  const handleGetListAddress = async () => {
    try {
      const res = await fetch(process.env.API_ADDRESS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
      });

      const addressData = await res.json();
      if (addressData.status === 200) {
        const data = addressData.data;

        setListAddress(data);
        if (data.length > 0) {
          const findDefaultAddress = data.filter((item) => item.isDefault == true);
          if (!findDefaultAddress || findDefaultAddress.length == 0) {
            setSelectedAddress(data[0]);
          } else {
            setSelectedAddress(findDefaultAddress[0]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoucherShow = async () => {
    setShowVoucher(true);
    try {
      const response = await fetch(process.env.API_VOUCHER_URL, {
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
    setSelectedVoucher(voucher);
    handleCloseVoucher();
  };
  const handleSelectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    console.log(e.target.value);
  };

  const handleUpdateAddAddress = (data) => {
    const newListAddress = [...listAddress, data];
    setListAddress(newListAddress);
    if (data.isDefault) {
      setSelectedAddress(data);
    }
  };

  const handleChangeAddress = (addressItem) => {
    setSelectedAddress(addressItem);
  };

  const handleOrder = async (e) => {
    const payload = {
      cartItemIds: ["623aefe7985fd0521259e42e"],
      method: "cod",
      address: selectedAddress._id,
    };
    const response = await fetch(`${process.env.API_ORDER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
      body: JSON.stringify(payload),
    });
    console.log("respone", response);

    const data = await response.json();
    console.log("data", data);
    if (data.status === 200) {
      alert("Success");
    } else {
      alert(data.data);
    }
  };

  return (
    <>
      <HeaderAuthen />
      <CommonLayout parent="home" title="Checkout">
        {/* <CheckoutPage
          listAddress={listAddress}
          cartItems={cartItems}
          selectedAddress={selectedAddress}
          handleVoucherShow={handleVoucherShow}
          handleCloseVoucher={handleCloseVoucher}
          showVoucher={showVoucher}
          vouchers={vouchers}
          handleApplyVoucher={handleApplyVoucher}
          handleSelectPaymentMethod={handleSelectPaymentMethod}
          handleUpdateAddAddress={handleUpdateAddAddress}
          handleChangeAddress={handleChangeAddress}
          handleOrder={handleOrder}
          selectedVoucher={selectedVoucher}
          paymentMethod={paymentMethod}
        /> */}
      </CommonLayout>
      <Footer />
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const response = await fetch(`${process.env.API_ORDER_URL}/checkout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });
  const { data } = await response.json();
  // const grouped = _.groupBy( data.cartItems.docs, p => p.vendor._id);
  // const vendors = Object.entries(grouped)
  // const results = vendors.map(v =>{
  //   return {
  //     vendor: v[1][0].vendor,
  //     products: v.pop()
  //   }
  // })
  // const fullP = results.map((product) => {
  //   const products = product.products.map((p, index) => {
  //     console.log("p", p)
  //   })
  // })
  console.log("data", data)

  return {
    props: {
      data,
    },
  };
}