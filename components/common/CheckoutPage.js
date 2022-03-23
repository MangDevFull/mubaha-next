import React, { useState } from "react";
import { Container } from "reactstrap";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./CheckoutPage.module.css";
import Address from "@/components/Address";
import Voucher from "@/components/Voucher";
import NumberFormat from "react-number-format";

const CheckoutPage = ({
  data,
  handleVoucherShow,
  handleCloseVoucher,
  showVoucher,
  vouchers,
  handleApplyVoucher,
  handleSelectPaymentMethod,
}) => {
  console.log(data);
  const [obj, setObj] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showAddress, setShowAddress] = useState("default");
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const router = useRouter();
  const handleCloseCreateAdd = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setMessage("");
    setShowMessage(false);
  };

  const handleUpdateAddress = (value) => {
    setShowAddress(value);
  };
  const handleQuit = (value) => {
    setShowAddress(value);
  };
  const onSuccess = (payment) => {
    router.push({
      pathname: "/page/order-success",
      state: {
        payment: payment,
        items: cartItems,
        orderTotal: total,
        symbol: symbol,
      },
    });
  };

  const onSubmit = (data) => {
    if (data !== "") {
      alert("You submitted the form and stuff!");
      router.push({
        pathname: "/page/order-success",
        state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
      });
    } else {
      errors.showMessages();
    }
  };

  return (
    <>
      <section className="section-b-space">
        <Container>
          <div className="checkout-page">
            <div className="checkout-form">
              <div className={`${styles.address}`}>
                <h4>1. Chọn địa chỉ giao hàng</h4>
                <div className={`${styles.table_address}`}>
                  <div className={`${styles.border_top}`}></div>
                  <div className={`${styles.padding_box}`}>
                    <div className={`${styles.title_address}`}>
                      <div className={`${styles.icon_address}`}>
                        <div className={`${styles.icon}`}>
                          <svg height="16" viewBox="0 0 12 16" width="12" fill="#f89922">
                            <path
                              d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div>Địa chỉ giao hàng</div>
                      </div>
                      {showAddress === "change" && (
                        <>
                          <div className={`${styles.button_select_address}`}>
                            <button
                              className={`${styles.button_add_address} ${styles.method_content}`}
                              onClick={handleShow}
                            >
                              <svg
                                enableBackground="new 0 0 10 10"
                                viewBox="0 0 10 10"
                                role="img"
                                className="stardust-icon stardust-icon-plus-sign _3PTu7X"
                              >
                                <path
                                  stroke="none"
                                  d="m10 4.5h-4.5v-4.5h-1v4.5h-4.5v1h4.5v4.5h1v-4.5h4.5z"
                                ></path>
                              </svg>
                              Thêm địa chỉ mới
                            </button>
                            <button
                              className={`${styles.button_add_address} ${styles.method_content}`}
                              onClick={handleShow}
                            >
                              Sửa địa chỉ
                            </button>

                            <Link href="/account">
                              <button className={`${styles.button_add_address}`}>
                                Thiết lập địa chỉ
                              </button>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>

                    {showAddress === "change" && (
                      <>
                        <div className={`${styles.list_address}`}>
                          <ul>
                            <li>
                              <input
                                type="radio"
                                name="delivery_address"
                                data-view-index="cod"
                                readOnly
                                value="address"
                              />
                              <div className={`${styles.detail_info}`}>
                                <div className={`${styles.info}`}>
                                  <div className={`${styles.fullName}`}>
                                    Nguyễn Minh Quang (+84) 373922863
                                  </div>
                                  <div className={`${styles.detailAddress}`}>
                                    Tầng 2, Detech tower II,107 Nguyễn Phong Sắc, Phường Dịch Vọng
                                    Hậu, Quận Cầu Giấy, Hà Nội
                                  </div>
                                  <div className={`${styles.default}`}>Mặc định</div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <input
                                type="radio"
                                name="delivery_address"
                                data-view-index="cod"
                                readOnly
                                value="address2"
                              />
                              <div className={`${styles.detail_info}`}>
                                <div className={`${styles.info}`}>
                                  <div className={`${styles.fullName}`}>
                                    Nguyễn Minh Quang (+84) 373922863
                                  </div>
                                  <div className={`${styles.detailAddress}`}>
                                    Tầng 2, Detech tower II,107 Nguyễn Phong Sắc, Phường Dịch Vọng
                                    Hậu, Quận Cầu Giấy, Hà Nội
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className={`${styles.button_change}`}>
                          <button
                            className={`${styles.button_add_address} ${styles.button_success} `}
                          >
                            Hoàn Thành
                          </button>
                          <button
                            className={`${styles.button_add_address} ${styles.button_back}`}
                            onClick={() => handleQuit("default")}
                          >
                            Trở về
                          </button>
                        </div>
                      </>
                    )}

                    {showAddress === "default" && (
                      <>
                        <div className="detail_infor">
                          <div className={`${styles.info}`}>
                            <div className={`${styles.fullName}`}>
                              Nguyễn Minh Quang (+84) 373922863
                            </div>
                            <div className={`${styles.detailAddress}`}>
                              Tầng 2, Detech tower II,107 Nguyễn Phong Sắc, Phường Dịch Vọng Hậu,
                              Quận Cầu Giấy, Hà Nội
                            </div>
                            <div className={`${styles.default}`}>Mặc định</div>
                          </div>
                        </div>

                        <div>
                          <button
                            className={`${styles.btn_change} btn p-0 m-0`}
                            onClick={() => handleUpdateAddress("change")}
                          >
                            Thay đổi địa chỉ
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={`${styles.border_top}`}></div>
                </div>
              </div>
              <div className={`${styles.list_cart}`}>
                <h4>2. Chọn hình thức giao hàng</h4>
                <div className={`${styles.title_section}`}>
                  <div className={`${styles.title}`}>
                    <div className={`${styles.title_name} ${styles.title_products}`}>
                      <div className={`${styles.products}`}>Sản phẩm</div>
                    </div>
                    <div className={`${styles.title_name} ${styles.classify_products}`}></div>
                    <div className={`${styles.title_name}`}>Giá tiền</div>
                    <div className={`${styles.title_name}`}>Số lượng</div>
                    <div className={`${styles.title_name} ${styles.title_price}`}>Thành tiền</div>
                  </div>
                </div>
                <div>
                  {data.docs && data.data.docs.length > 0 && data.data.docs.map((product, index) => {
                    return (
                      <div key={index}>
                        <div className={`${styles.total_price_information}`}>
                          <div>
                            <div className={`${styles.detail_order_information}`}>
                              <div className={`${styles.vendor_name}`}>
                                <span>{product.vendor.brandName}</span>
                              </div>
                              <div className={`${styles.section_order_info}`}>
                                <div className={`${styles.order_info}`}>
                                  <div
                                    className={`${styles.title_info} ${styles.title_image_product}`}
                                  >
                                    <img width="40px" src={product.product.media.featuredImage} />
                                    <span>
                                      <span className={`${styles.name_product}`}>
                                        {product.product.name}
                                      </span>
                                    </span>
                                  </div>

                                  <div className={`${styles.title_info} ${styles.classify_info}`}>
                                    {product.product.variants.length > 0 ? (
                                      <span>Loại: {product.product.variants}</span>
                                    ) : (
                                      <span></span>
                                    )}
                                  </div>
                                  <div className={`${styles.title_info}`}>
                                    <NumberFormat
                                      value={product.product.price}
                                      thousandSeparator={true}
                                      displayType="text"
                                      suffix={product.product.currencySymbol}
                                      decimalScale={0}
                                    />
                                  </div>
                                  <div className={`${styles.title_info}`}>{product.amount}</div>
                                  <div className={`${styles.title_info}`}>
                                    <NumberFormat
                                      value={product.product.price * product.amount}
                                      thousandSeparator={true}
                                      displayType="text"
                                      suffix={product.product.currencySymbol}
                                      decimalScale={0}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className={`${styles.section_voucher_shop}`}>
                                <div className={`${styles.voucher_shop}`}>
                                  <div className={`${styles.title_voucher_shop}`}>
                                    <div className={`${styles.image_voucher}`}>
                                      <img src="https" />
                                      <div>Voucher của Shop</div>
                                    </div>
                                  </div>
                                  <div className={`${styles.button_voucher_shop}`}>
                                    <button>
                                      <span>Chọn voucher</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={`${styles.voucher}`}>
                <h4>3. Chọn Voucher</h4>
                <div className={`${styles.section_voucher}`}>
                  <div className={`${styles.title_voucher}`}>
                    <div className={`${styles.title_voucher1}`}>
                      <div className={`${styles.title_voucher2}`}>
                        {/* icon voucher */}
                        <span className={`${styles.title_name_voucher}`}>Mubaha voucher</span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.selectVoucher}`}>
                    <button
                      className={`${styles.btn_change} btn p-0 m-0`}
                      onClick={handleVoucherShow}
                    >
                      Chọn Voucher
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${styles.payments}`}>
                <h4>4. Chọn hình thức thanh toán</h4>
                <div className={`${styles.payment_methods}`}>
                  <ul>
                    <li>
                      <label className={`${styles.methods}`}>
                        <input
                          type="radio"
                          name="payment_methods"
                          data-view-index="cod"
                          readOnly
                          value="cod"
                          onChange={handleSelectPaymentMethod}
                        />
                        <span>
                          <div className={`${styles.method_content_name}`}>
                            <img
                              width="32px"
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                            />
                            <span>Thanh toán tiền mặt khi nhận hàng</span>
                          </div>
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className={`${styles.methods}`}>
                        <input
                          type="radio"
                          name="payment_methods"
                          data-view-index="atm"
                          readOnly
                          value="atm"
                          onChange={handleSelectPaymentMethod}
                        />
                        <span>
                          <div className={`${styles.method_content_name}`}>
                            <img
                              width="32px"
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg"
                            />

                            <span>Thẻ ATM nội địa/Internet Banking (Hỗ trợ Internet Banking)</span>
                          </div>
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className={`${styles.methods}`}>
                        <input
                          type="radio"
                          name="payment_methods"
                          data-view-index="paypal"
                          readOnly
                          value="paypal"
                          onChange={handleSelectPaymentMethod}
                        />
                        <span>
                          <div className={`${styles.method_content_name}`}>
                            <span>Thanh toán bằng Paypal</span>
                          </div>
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className={`${styles.methods}`}>
                        <input
                          type="radio"
                          name="payment_methods"
                          data-view-index="vnpay"
                          readOnly
                          value="vnpay"
                          onChange={handleSelectPaymentMethod}
                        />
                        <span>
                          <div className={`${styles.method_content_name}`}>
                            <img
                              width="32px"
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-vnpay.png"
                            />

                            <span>Thanh toán bằng VNPAY</span>
                          </div>
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${styles.total}`}>
                <h4>5. Tổng đơn hàng </h4>
                <div className={`${styles.total_prices}`}>
                  <div
                    className={`${styles.total_title_price} ${styles.title_each_total} ${styles.total_amount}`}
                  >
                    Tổng tiền hàng
                  </div>
                  <div
                    className={`${styles.total_title_price} ${styles.total_amount} ${styles.prices}`}
                  >
                    ₫1.147.000
                  </div>
                  <div
                    className={`${styles.total_title_price} ${styles.title_each_total} ${styles.transport_fee}`}
                  >
                    Phí vận chuyển
                  </div>
                  <div
                    className={`${styles.total_title_price} ${styles.transport_fee} ${styles.prices}`}
                  >
                    ₫70.700
                  </div>

                  <div
                    className={`${styles.total_title_price} ${styles.title_each_total} ${styles.total_payment}`}
                  >
                    Tổng thanh toán:
                  </div>
                  <div
                    className={`${styles.total_title_price} ${styles.total_payment} ${styles.prices}`}
                  >
                    <span>₫1.217.700</span>
                  </div>
                  <div className={`${styles.section_button_order}`}>
                    <div className={`${styles.section_rules}`}>
                      <div>
                        Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                        <a href="" target="_blank" rel="noopener noreferrer">
                          Điều khoản Mubaha
                        </a>
                      </div>
                    </div>
                    <button className={`${styles.button_order}`}>Đặt hàng</button>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </Container>
      </section>
      {/* Modal add address */}
      <Address isOpen={show} handleCloseCreateAdd={handleCloseCreateAdd} />
      {/* Modal voucher */}
      <Voucher
        isOpen={showVoucher}
        handleCloseVoucher={handleCloseVoucher}
        vouchers={vouchers}
        handleApplyVoucher={handleApplyVoucher}
      />
    </>
  );
};

export default CheckoutPage;