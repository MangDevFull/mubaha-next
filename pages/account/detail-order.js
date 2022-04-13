import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Layout from "@/components/profile/Layout.js";
import { Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { AiOutlineDoubleLeft, AiOutlineQuestionCircle } from "react-icons/ai";
import styles from "@/styles/account.module.css";
import { FaStore, FaShuttleVan, FaRegMoneyBillAlt } from "react-icons/fa";
import { FcInTransit } from "react-icons/fc";
import NumberFormat from "react-number-format";

const OrderDetail = () => {
  return (
    <>
      <div className="dashboard-right">
        <div className="dashboard py-3 px-3 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <Button className="d-flex align-items-center">
                <AiOutlineDoubleLeft />
                <span>Quay lại đơn hàng của tôi</span>
              </Button>
            </div>
            <div className="text-uppercase">
              <span>id đơn hàng: 220401D2C3CKP6</span>
              <span className="mx-2">|</span>
              <span style={{ color: "#f89922" }}>đơn hàng đã giao</span>
            </div>
          </div>
          <div className="my-2"></div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <Button className="d-flex align-items-center">
                <AiOutlineDoubleLeft />
                <span>Quay lại đơn hàng của tôi</span>
              </Button>
            </div>
            <div className="text-uppercase">
              <span>id đơn hàng: 220401D2C3CKP6</span>
              <span className="mx-2">|</span>
              <span style={{ color: "#f89922" }}>đơn hàng đã giao</span>
            </div>
          </div>
        </div>
        <div className={`${styles.border}`}></div>
        <div className="dashboard py-3 px-4 d-flex flex-column border border-bottom-0">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <div className="d-flex align-items-center">
                <h4 className="mb-0 font-weight-bold">địa chỉ nhận hàng</h4>
              </div>
            </div>
            <div>
              <div
                className="d-flex flex-column text-right"
                style={{ fontSize: "12px", color: "rgba(0,0,0,.54)" }}
              >
                <span>Nhanh - Shopee Xpress</span>
                <span>SPXVN022222721754</span>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="d-flex flex-column pt-2 pr-3" style={{ width: "40%" }}>
              <div className="font-weight-bolder mb-3">Nguyễn Minh Quang</div>
              <div className="d-flex flex-column" style={{ color: "rgba(0,0,0,.54)" }}>
                <div>0373922863</div>
                <div>
                  Toà Nhà Sông Đà, Ngõ 165 Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội
                </div>
              </div>
            </div>
            <div className="border-left border-dark">
              <div className="d-flex flex-column pt-1 pl-4">
                <span>Nhanh - Shopee Xpress</span>
                <span>SPXVN022222721754</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card className="p-3 rounded-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}>
            <CardHeader className="pt-0 px-0 mx-3" style={{ backgroundColor: "transparent" }}>
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <div>
                    <img src="/assets/icon/shop-icon.png" className="mr-2" />
                  </div>
                  <div className="mx-2">
                    <span>
                      <strong>SEUSUK.vn</strong>{" "}
                    </span>{" "}
                  </div>
                  <Button
                    size="sx"
                    style={{
                      color: "#f89922",
                      background: "#fff",
                      border: "1px solid #f89922",
                    }}
                    className="d-flex flex-row align-items-center"
                  >
                    <FaStore />
                    <span className="mx-2 font-weight-normal">Xem Shop</span>
                  </Button>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-row align-items-center mr-2">
                    <AiOutlineQuestionCircle />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="py-0">
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    className="border mr-3"
                    width="85vw"
                    src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                  />
                  <div className="d-flex flex-column justify-content-between p-2">
                    <h4 className="mb-0" style={{ lineHeight: "1.3" }}>
                      Áo FOG size L mùa hè 2022
                    </h4>
                    {/* {product.selectedVariant === null ? (
                        ""
                      ) : product.selectedAttribute === null ? (
                        <span>Phân loại hàng: {product.selectedVariant.name}</span>
                      ) : (
                        <span>
                          Phân loại hàng: {product.selectedVariant.name} -{" "}
                          {product.selectedAttribute.name}
                        </span>
                      )} */}
                    <span>Phân loại hàng: size L</span>
                    <p className="mb-0">x 2</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <del className="mx-1">
                    <span className="money ml-1">
                      <span>
                        {/* {product.discount > 0 && (
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
                          )} */}
                      </span>
                    </span>
                  </del>
                  <span style={{ color: "#f89922" }}>
                    <NumberFormat
                      value={122333}
                      thousandSeparator={true}
                      displayType="text"
                      suffix="đ"
                      decimalScale={0}
                    />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className={`${styles.border}`}></div>
        <div className="dashboard p-0">
          <div
            className="d-flex justify-content-end px-3"
            style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
          >
            <div className="p-3">
              <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                Tổng tiền hàng
              </h6>
            </div>
            <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
              <div style={{ width: "15vw" }} className="text-right pr-2">
                252.000₫
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-end px-3"
            style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
          >
            <div className="p-3">
              <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                Phí vận chuyển
              </h6>
            </div>
            <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
              <div style={{ width: "15vw" }} className="text-right pr-2">
                252.000₫
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-end px-3"
            style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
          >
            <div className="p-3">
              <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                Giảm giá phí vận chuyển
              </h6>
            </div>
            <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
              <div style={{ width: "15vw" }} className="text-right pr-2">
                - 252.000₫
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-end px-3"
            style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
          >
            <div className="p-3">
              <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                Voucher từ Mubaha
              </h6>
            </div>
            <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
              <div style={{ width: "15vw" }} className="text-right pr-2">
                - 252.000₫
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center px-3">
            <div className="p-3">
              <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                Tổng số tiền
              </h6>
            </div>
            <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
              <h3 style={{ width: "15vw", color: "#f89922" }} className="text-right pr-2">
                252.000₫
              </h3>
            </div>
          </div>
        </div>
        <div className={`${styles.border}`}></div>
        <div className="dashboard p-0">
          <div className="d-flex justify-content-end px-3">
            <div className="p-3 d-flex justify-content-center align-items-center">
              <FcInTransit />
              <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                Phương thức thanh toán
              </h6>
            </div>
            <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
              <div
                style={{ width: "15vw", fontSize: "13px" }}
                className="text-right pr-2 font-weight-bold"
              >
                Thanh toán khi nhận hàng
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

OrderDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default OrderDetail;
