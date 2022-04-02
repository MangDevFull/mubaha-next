import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  TabContainer,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
} from "reactstrap";
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
  const { data: session } = useSession();
  const [listOrder, setListOrder] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [deliveryStatus, setDeliveryStatus] = useState("");

  const handleTransport = async (status) => {
    setDeliveryStatus(status);
    try {
      const response = await fetch(
        `${process.env.API_ORDER_URL}/listing?status=${deliveryStatus}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.accessToken,
          },
        }
      );
      const { data } = await response.json();
      setListOrder(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="dashboard-right">
        <div className="d-flex flex-column">
          <div className="tab-product pt-0 m-0">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => setActiveTab("1")}
                  >
                    Tất cả đơn hàng
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("2");
                      handleTransport("pending");
                    }}
                  >
                    Chờ xác nhận
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("3");
                      handleTransport("shipmentPending");
                    }}
                  >
                    Chờ lấy hàng
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "4" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("4");
                      handleTransport("shipping");
                    }}
                  >
                    Đang giao
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "5" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("5");
                      handleTransport("done");
                    }}
                  >
                    Đã giao
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "6" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("6");
                      handleTransport("cancel");
                    }}
                  >
                    Đã huỷ
                  </NavLink>
                </NavItem>
              </Nav>
            </Row>
          </div>
          {/* <div
            className="d-flex mt-3 mb-3 align-items-center p-3 rounded"
            style={{ backgroundColor: "#eaeaea", fontSize: "15px" }}
          >
            <AiOutlineSearch size="22px" color="#bbb" />
            <input
              style={{ backgroundColor: "#eaeaea" }}
              className="border-0 flex-grow-1 pl-2"
              placeholder="Tìm kiếm theo Tên sản phẩm, ID đơn hàng hoặc Tên Shop"
            />
          </div> */}
          <TabContent activeTab={activeTab} className="nav-material">
            <TabPane tabId="1">
              {data.docs.length > 0 ? (
                data.docs.map((order, i) => {
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
            </TabPane>
            <TabPane tabId="2">
              <p className="mb-0 pb-0">
                {" "}
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
              </p>
            </TabPane>
            <TabPane tabId="3">
              <p className="mb-0 pb-0">
                {" "}
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
              </p>
            </TabPane>
            <TabPane tabId="4">
              <p className="mb-0 pb-0">
                {" "}
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
              </p>
            </TabPane>
            <TabPane tabId="5">
              <p className="mb-0 pb-0">
                {" "}
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
              </p>
            </TabPane>
            <TabPane tabId="6">
              <p className="mb-0 pb-0">
                {" "}
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
              </p>
            </TabPane>
          </TabContent>
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
