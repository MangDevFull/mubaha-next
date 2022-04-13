import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "@/components/profile/Layout.js";
import { Button, Card, CardBody, CardHeader, CardFooter, Popover, PopoverBody } from "reactstrap";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import styles from "@/styles/account.module.css";
import { FaStore, FaInfoCircle, FaMoneyCheck, FaTruck, FaRegStar } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { FcInTransit } from "react-icons/fc";
import NumberFormat from "react-number-format";
import Steps from "@/components/order-detail/Steps";
import format from "date-fns/format";

const OrderDetail = ({ data }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const onHover = () => {
    setPopoverOpen(true);
  };
  const onHoverLeave = () => {
    setPopoverOpen(false);
  };
  return (
    <>
      {!data ? (
        <></>
      ) : (
        <div className="dashboard-right">
          <div className="dashboard py-3 px-3 d-flex flex-column border-bottom-0">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Button className="d-flex align-items-center">
                  <AiOutlineDoubleLeft />
                  <Link href="/account/list-order">
                    <a>
                      <span style={{ color: "#ffffff" }}>Quay lại đơn hàng của tôi</span>
                    </a>
                  </Link>
                </Button>
              </div>
              <div className="text-uppercase">
                <span>id đơn hàng: {data.orderId}</span>
                <span className="mx-2">|</span>
                <span style={{ color: "#f89922" }}>{data.status}</span>
              </div>
            </div>
          </div>
          <div style={{ border: " 1px dotted rgba(0, 0, 0, 0.09)" }}></div>
          <div className="dashboard py-3 px-3 d-flex flex-column border-top-0">
            <div className="  align-items-center justify-content-between">
              
              <div className="main_container">
                <div class="container padding-bottom-3x mb-1">
                  <div class="card mb-3">
                    <div class="p-4 text-center text-white text-lg bg-dark rounded-top">
                      <span class="text-uppercase">Tracking Order No - </span>
                      <span class="text-medium">{data.orderId}</span>
                    </div>
                    <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                      <div class="w-100 text-center py-1 px-2">
                        <span class="text-medium">Vận chuyển qua:</span> {data.shipmentMethod.name}
                      </div>
                      <div class="w-100 text-center py-1 px-2">
                        <span class="text-medium">Trạng thái:</span> Đã thanh toán
                      </div>
                     
                    </div>
                    <div class="card-body">
                      <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-around padding-top-2x padding-bottom-1x">
                      
                        <div class="step completed flex-fill">
                          <div class="step-icon-wrap">
                            <div class="step-icon">
                              <i className="pt-0">
                                <RiBillFill />
                              </i>
                            </div>
                          </div>
                          <h4 class="step-title text-center">
                            <strong>Đơn hàng đã đặt</strong>
                            <p>
                            {format(
                                  new Date(data.proccessingInfo.orderAt),
                                  "HH:mm MM/dd/yyyy"
                                )}</p>
                          </h4>
                        </div>
                        <div class="step completed flex-grow-1">
                          <div class="step-icon-wrap">
                            <div class="step-icon">
                              <i>
                                <FaMoneyCheck />
                              </i>
                            </div>
                          </div>
                          <h4 class="step-title text-center">
                            <strong>Đã thanh toán</strong>
                            <p>{format(
                                  new Date(data.proccessingInfo.paymentAt),
                                  "HH:mm MM/dd/yyyy"
                                )}</p>
                          </h4>
                        </div>
                        <div class="step flex-grow-1">
                          <div class="step-icon-wrap">
                            <div class="step-icon">
                              <i>
                                <FaTruck />
                              </i>
                            </div>
                          </div>
                          <h4 class="step-title text-center">
                            <strong>Đã giao cho ĐVVC</strong>
                          </h4>
                        </div>
                        <div class="step flex-grow-1">
                          <div class="step-icon-wrap">
                            <div class="step-icon">
                              <i>
                                <MdDeliveryDining />
                              </i>
                            </div>
                          </div>
                          <h4 class="step-title text-center">
                            <strong>Đang giao</strong>
                          </h4>
                        </div>
                        <div class="step flex-grow-1">
                          <div class="step-icon-wrap">
                            <div class="step-icon">
                              <i>
                                <FaRegStar />
                              </i>
                            </div>
                          </div>
                          <h4 class="step-title text-center">
                            <strong>Đánh giá</strong>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <span>
                    <span className="text-uppercase">{data.shipmentMethod.type}</span> -{" "}
                    {data.shipmentMethod.name}
                  </span>
                  {data.shipmentMethod._id ? <span>{data.shipmentMethod._id}</span> : <span></span>}
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="d-flex flex-column pt-2 pr-3" style={{ width: "40%" }}>
                <div className="font-weight-bolder mb-3">{data.deliveryAddress.fullName}</div>
                <div className="d-flex flex-column" style={{ color: "rgba(0,0,0,.54)" }}>
                  <div>{data.deliveryAddress.phone}</div>
                  <div>{data.deliveryAddress.fullAddress}</div>
                </div>
              </div>
              <div class="border-left border-dark">
                <div className="d-flex flex-column pt-1 pl-4">
                  {data.shipment?.details.length > 0 ? (
                    <>
                      <Steps data={data.shipment.details} />
                    </>
                  ) : (
                    <span className="mt-2">Không có Thông tin vận chuyển</span>
                  )}
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
                        <strong>{data.vendor.brandName}</strong>{" "}
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

                      <Link href={`/vendors/${data.vendor.owner.username}`}>
                        <a style={{ color: "#f89922" }} className="mx-2 font-weight-normal">
                          Xem Shop
                        </a>
                      </Link>
                    </Button>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="d-flex flex-row align-items-center mr-2">
                      {data.shipment?.details.length > 0 ? (
                        <div>
                          <div
                            role="button"
                            id="Popover1"
                            type="button"
                            onMouseEnter={onHover}
                            onMouseLeave={onHoverLeave}
                          >
                            <FaInfoCircle />
                          </div>
                          <Popover
                            style={{ width: "9rem" }}
                            flip
                            target="Popover1"
                            isOpen={popoverOpen}
                            toggle={onHover.bind(this)}
                          >
                            <PopoverBody>
                              <span>Cập nhật mới nhất</span>
                              <br />
                              <span>
                                {format(
                                  new Date(data.shipment.details[0].createdAt),
                                  "HH:mm MM/dd/yyyy"
                                )}
                              </span>
                            </PopoverBody>
                          </Popover>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              {data.products.map((product) => {
                return (
                  <CardBody className="py-0">
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="border mr-3"
                          width="85vw"
                          src={product.product.media.featuredImage}
                        />
                        <div className="d-flex flex-column justify-content-between p-2">
                          <h4 className="mb-0" style={{ lineHeight: "1.3" }}>
                            {product.product.name}
                          </h4>
                          {!product.selectedVariant ? (
                            !product.selectedAttribute ? (
                              <></>
                            ) : (
                              <span>Phân loại hàng: {product.selectedAttribute}</span>
                            )
                          ) : (
                            <span>
                              Phân loại hàng: {product.selectedVariant} -{" "}
                              {product.selectedAttribute}
                            </span>
                          )}
                          <p className="mb-0"> x {product.amount}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        {product.discount > 0 ? (
                          <>
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
                            <h3 className="mb-0 mx-2" style={{ color: "#f89922" }}>
                              <NumberFormat
                                value={(1 - product.discount) * product.price}
                                thousandSeparator={true}
                                displayType="text"
                                suffix="đ"
                                decimalScale={0}
                              />
                            </h3>
                          </>
                        ) : (
                          <h3 className="mb-0 mx-2" style={{ color: "#f89922" }}>
                            <NumberFormat
                              value={product.price}
                              thousandSeparator={true}
                              displayType="text"
                              suffix="đ"
                              decimalScale={0}
                            />
                          </h3>
                        )}
                      </div>
                    </div>
                  </CardBody>
                );
              })}
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
                  <NumberFormat
                    value={data.totalPriceBefore}
                    thousandSeparator={true}
                    displayType="text"
                    suffix={data.currencySymbol}
                    decimalScale={0}
                  />
                </div>
              </div>
            </div>
            {/* <div
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
          </div> */}
            {data.totalVendorDiscount && data.totalVendorDiscount > 0 ? (
              <div
                className="d-flex justify-content-end px-3"
                style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
              >
                <div className="p-3">
                  <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                    Giảm giá từ Voucher Shop
                  </h6>
                </div>
                <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                  <div style={{ width: "15vw", color: "red" }} className="text-right pr-2">
                    {" - "}
                    <NumberFormat
                      value={data.totalVendorDiscount}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={data.currencySymbol}
                      decimalScale={0}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {data.totalSystemDiscount && data.totalSystemDiscount > 0 ? (
              <div
                className="d-flex justify-content-end px-3"
                style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
              >
                <div className="p-3">
                  <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                    Giảm giá từ Voucher Mubaha
                  </h6>
                </div>
                <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                  <div style={{ width: "15vw", color: "red" }} className="text-right pr-2">
                    {" - "}
                    <NumberFormat
                      value={data.totalSystemDiscount}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={data.currencySymbol}
                      decimalScale={0}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {data.voucherDiscountAmount && data.voucherDiscountAmount > 0 ? (
              <div
                className="d-flex justify-content-end px-3"
                style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
              >
                <div className="p-3">
                  <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                    Tổng giảm giá Voucher
                  </h6>
                </div>
                <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                  <div style={{ width: "15vw", color: "red" }} className="text-right pr-2">
                    {" - "}

                    <NumberFormat
                      value={data.voucherDiscountAmount}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={data.currencySymbol}
                      decimalScale={0}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="d-flex justify-content-end align-items-center px-3">
              <div className="p-3">
                <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                  Tổng số tiền
                </h6>
              </div>
              <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                <h3 style={{ minWidth: "15vw", color: "#f89922" }} className="text-right pr-2">
                  <NumberFormat
                    value={data.totalPrice}
                    thousandSeparator={true}
                    displayType="text"
                    suffix={data.currencySymbol}
                    decimalScale={0}
                  />
                </h3>
              </div>
            </div>
          </div>
          <div className={`${styles.border}`}></div>
          <div className="dashboard p-0">
            <div className="d-flex justify-content-end px-3">
              <div className="p-3 d-flex justify-content-center align-items-center">
                <FcInTransit style={{ fontSize: "18px" }} />
                <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                  Phương thức thanh toán
                </h6>
              </div>
              <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                <div
                  style={{ width: "15vw", fontSize: "13px" }}
                  className="text-right pr-2 font-weight-bold"
                >
                  {data.payment.method}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

OrderDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default OrderDetail;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { orderId } = context.query;
  const res = await fetch(`${process.env.API_ORDER_URL}/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}
