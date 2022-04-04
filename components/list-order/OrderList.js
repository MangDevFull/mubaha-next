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

const OrderList = ({ order }) => {
  return (
    <>
      <Card className="p-4 my-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}>
        <CardHeader style={{ backgroundColor: "transparent" }}>
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
                <span style={{ textTransform: "uppercase", color: "#f89922" }}>{order.status}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="py-0">
          {order.products.length > 0 &&
            order.products.map((product, i) => {
              return (
                <div key={i} className="d-flex align-items-center justify-content-between my-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      className="border mr-3"
                      width="85vw"
                      src={`${product.product.media.featuredImage}`}
                    />
                    <div className="d-flex flex-column justify-content-between p-2">
                      <h4 className="mb-0" style={{ lineHeight: "1.3" }}>
                        {product.product.name}
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
                      <p className="mb-0">x {product.amount}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <del className="mx-1">
                      <span className="money ml-1">
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
        </CardBody>
        <CardFooter style={{ backgroundColor: "transparent" }}>
          <div className="d-flex justify-content-end align-items-center">
            <FaRegMoneyBillAlt />
            <div className="p-2">Tổng số tiền:</div>
            <h3 className="mb-0" style={{ color: "#f89922" }}>
              <NumberFormat
                value={order.totalPrice}
                thousandSeparator={true}
                displayType="text"
                suffix={order.currencySymbol}
                decimalScale={0}
              />
            </h3>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
export default OrderList;
