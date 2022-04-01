import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Container, Row, Col, Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import Link from "next/link";
import styles from "@/styles/account.module.css";
import AddressChild from "@/components/AddressChild.js";
import Address from "@/components/Address";
import Layout from "@/components/profile/Layout.js";
import Head from "next/head";
import { AiOutlineSearch, AiOutlineQuestionCircle } from "react-icons/ai";
import { FaStore, FaShuttleVan, FaRegMoneyBillAlt } from "react-icons/fa";
import NumberFormat from "react-number-format";
import OrderList from "@/components/list-order/OrderList.js";

const ListOrder = ({ data }) => {
  const [listOrder, setListOrder] = useState([]);
  console.log(data);

  useEffect(() => {
    if (data) setListOrder(data.docs);
  }, []);
  return (
    <>
      <div className="dashboard-right">
        <div className="d-flex flex-column">
          <div className="dashboard">
            <h2 className="mb-0">Tất cả đơn hàng</h2>
          </div>
          <div
            className="d-flex mt-3 mb-3 align-items-center p-3 rounded"
            style={{ backgroundColor: "#eaeaea", fontSize: "15px" }}
          >
            <AiOutlineSearch size="22px" color="#bbb" />
            <input
              style={{ backgroundColor: "#eaeaea" }}
              className="border-0 flex-grow-1 pl-2"
              placeholder="Tìm kiếm theo Tên sản phẩm, ID đơn hàng hoặc Tên Shop"
            />
          </div>

          {listOrder.length > 0 ? (
            listOrder.map((order, i) => {
              return (
                <div key={i}>
                  <OrderList order={order} />
                </div>
              );
            })
          ) : (
            <div className="mt-3">
              <h3 className="text-center">
                {" "}
                Chưa có đơn hàng nào. Quay lại{" "}
                <Link href="/">
                  <a style={{ color: "#f89922" }}>Trang chủ</a>
                </Link>{" "}
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ListOrder.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ListOrder;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const response = await fetch(`${process.env.API_ORDER_URL}/listing`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const { data } = await response.json();
  return {
    props: { data },
  };
}
