import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Container, Row, Col, Button } from "reactstrap";
import Link from "next/link";
import styles from "@/styles/account.module.css";
import AddressChild from "@/components/AddressChild.js";
import Address from "@/components/Address";
import Layout from "@/components/profile/Layout.js";
import Head from "next/head";
import { AiOutlineSearch, AiOutlineQuestionCircle } from "react-icons/ai";
import { FaStore, FaShuttleVan, FaRegMoneyBillAlt } from "react-icons/fa";
import NumberFormat from "react-number-format";

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
                  <div className="dashboard mb-3">
                    <div className="d-flex flex-column">
                      <div>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <img src="/assets/icon/shop-icon.png" className="mr-2" />
                            </div>
                            <div className="mx-2">
                              <span>
                                <strong>{order.vendor.brandName}</strong>{" "}
                              </span>{" "}
                            </div>
                            <Button
                              size="sx"
                              style={{
                                color: "#f89922",
                                background: "#fff",
                                border: "1px solid #f89922",
                              }}
                              href={`/vendors/${order.vendor.owner.username}`}
                              className="d-flex flex-row align-items-center"
                            >
                              <FaStore />
                              <span className="mx-2 font-weight-normal">Xem Shop</span>
                            </Button>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="d-flex flex-row align-items-center border-right border-dark mr-2">
                              <FaShuttleVan className="mx-2" color="" />
                              <span className="text-capitalize">{order.shipment.status}</span>
                              <div className="mx-2">
                                <AiOutlineQuestionCircle />
                              </div>
                            </div>
                            <div>
                              <span style={{ textTransform: "uppercase", color: "#f89922" }}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="border-top my-3"></div>
                        {order.products.length > 0 &&
                          order.products.map((product, i) => {
                            console.log(product);
                            return (
                              <div
                                key={i}
                                className="d-flex align-items-center justify-content-between my-2"
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  <img
                                    className="border mr-3"
                                    width="85vw"
                                    src={`${product.media.featuredImage}`}
                                  />
                                  <div className="d-flex flex-column justify-content-between p-2">
                                    <h4 className="mb-0" style={{ lineHeight: "1.3" }}>
                                      {product.name}
                                    </h4>
                                    {product.selectedVariant === null ? (
                                      ""
                                    ) : product.selectedAttribute === null ? (
                                      <span>Phân loại hàng: {product.selectedVariant.name}</span>
                                    ) : (
                                      <span>
                                        Phân loại hàng: {product.selectedVariant.name} -{" "}
                                        {product.selectedAttribute.name}
                                      </span>
                                    )}
                                    <p className="mb-0">Số lượng: {product.amount}</p>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                  <del className="mx-1">
                                    <span class="money ml-1">
                                      <span>
                                        {product.discount > 0 && (
                                          <del>
                                            <span className="money ml-1">
                                              <NumberFormat
                                                value={product.price}
                                                thousandSeparator={true}
                                                displayType="text"
                                                suffix={product.currencySymbol}
                                                decimalScale={0}
                                              />
                                            </span>
                                          </del>
                                        )}
                                      </span>
                                    </span>
                                  </del>
                                  <span>
                                    <NumberFormat
                                      value={product.price * (1 - product.discount)}
                                      thousandSeparator={true}
                                      displayType="text"
                                      suffix={product.currencySymbol}
                                      decimalScale={0}
                                    />
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>

                      <div class="border-top my-3"></div>
                      <div className="d-flex justify-content-end align-items-center">
                        <FaRegMoneyBillAlt />
                        <div className="p-2">Tổng số tiền:</div>
                        <h3 className="mb-0">
                          <NumberFormat
                            value={order.totalPrice}
                            thousandSeparator={true}
                            displayType="text"
                            suffix={order.currencySymbol}
                            decimalScale={0}
                          />
                        </h3>
                      </div>
                    </div>
                  </div>
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
