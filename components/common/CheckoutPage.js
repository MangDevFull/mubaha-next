import React, { useState, useEffect } from "react";
import { Container, Alert, Modal, Button, ModalBody, ModalFooter, Row } from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./CheckoutPage.module.css";
import Address from "@/components/Address";
import Voucher from "@/components/Voucher";
import NumberFormat from "react-number-format";
import voucher from "../../assets/images/checkout/icon-voucher.svg";
import voucher2 from "../../assets/images/checkout/icon-voucher-v02.svg";

const CheckoutPage = ({
  listAddress,
  selectedAddress,
  handleVoucherShow,
  handleCloseVoucher,
  showVoucher,
  vouchers,
  handleApplyVoucher,
  handleSelectPaymentMethod,
  handleUpdateAddAddress,
  handleChangeAddress,
  handleOrder,
  cartItems,
  selectedVoucher,
  paymentMethod,
}) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [chooseAddress, setChooseAddress] = useState();
  const [showError, setShowError] = useState(true);
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const router = useRouter();

  const handleCloseCreateAdd = (data, setChecked) => {
    setShow(false);
    handleUpdateAddAddress(data);
  };
  const handleShow = () => {
    setShow(true);
    setMessage("");
    setShowMessage(false);
  };

  useEffect(() => {
    setChooseAddress(selectedAddress);
  }, [selectedAddress]);

  useEffect(() => {
    if (listAddress.length === 0) {
      setShowAddress(true);
    } else {
      setShowAddress(false);
    }
  }, [listAddress]);

  const handleUpdateShowAddress = () => {
    setShowAddress(!showAddress);
  };
  const handleQuit = () => {
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

  return (
    <>
      <section className={`section-b-space ${styles.section_checkout_page}`}>
        <Container>
          {cartItems && cartItems.length === 0 && (
            <>
              <Alert
                style={{ textAlign: "center", height: "auto", marginBottom: "2rem" }}
                color="danger"
              >
                Chưa có đơn hàng được lựa chọn. Vui lòng quay lại giỏ hàng
              </Alert>
              <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={showError}>
                <ModalBody className="container-fluid">
                  <Row className="pl-5 pr-5 pt-3" style={{ justifyContent: "center" }}>
                    <h3>Giỏ hàng trống</h3>
                  </Row>
                </ModalBody>
                <ModalFooter style={{ border: "none" }}>
                  <Button
                    className="btn btn-secondary btn-lg"
                    style={{ width: "100%", maxWidth: "100%", borderRadius: "5px" }}
                    onClick={() => setShowError(!showError)}
                  >
                    OK
                  </Button>
                </ModalFooter>
              </Modal>
            </>
          )}
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
                      {showAddress && (
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

                    {showAddress && listAddress.length > 0 && chooseAddress && (
                      <>
                        <div className={`${styles.list_address}`}>
                          <ul>
                            {listAddress.map((item, index) => {
                              return (
                                <li key={index}>
                                  <input
                                    type="radio"
                                    name="delivery_address"
                                    data-view-index="cod"
                                    readOnly
                                    onClick={() => setChooseAddress(item)}
                                    value="address2"
                                    checked={item._id === chooseAddress._id}
                                  />
                                  <div className={`${styles.detail_info}`}>
                                    <div className={`${styles.info}`}>
                                      <div className={`${styles.fullName}`}>
                                        {item.fullName} {item.phone}
                                      </div>
                                      <div className={`${styles.detailAddress}`}>
                                        {item.fullAddress}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        {listAddress.length > 0 && (
                          <div className={`${styles.button_change}`}>
                            <button
                              className={`${styles.button_add_address} ${styles.button_success} `}
                              onClick={() => {
                                handleChangeAddress(chooseAddress);
                                setShowAddress(!showAddress);
                              }}
                            >
                              Hoàn Thành
                            </button>
                            <button
                              className={`${styles.button_add_address} ${styles.button_back}`}
                              onClick={() => {
                                setChooseAddress(selectedAddress);
                                setShowAddress(!showAddress);
                              }}
                            >
                              Trở về
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {!showAddress && (
                      <>
                        {selectedAddress && (
                          <div className="detail_infor">
                            <div className={`${styles.info}`}>
                              <div className={`${styles.fullName}`}>
                                {selectedAddress.fullName} {selectedAddress.phone}
                              </div>
                              <div className={`${styles.detailAddress}`}>
                                {selectedAddress.fullAddress}
                              </div>
                              <div className={`${styles.default}`}>Mặc định</div>
                            </div>
                          </div>
                        )}

                        <div>
                          <button
                            className={`${styles.btn_change} btn p-0 m-0`}
                            onClick={() => {
                              setShowAddress(!showAddress);
                            }}
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
                  {cartItems &&
                    cartItems.length > 0 &&
                    cartItems.map((product, index) => {
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
                                      {/* {product.product.variants && product.product.variants.length > 0 && product.product.variants.filter((variant) => {
                                                return variant._id = product.selectedVariant
                                      })} */}
                                      <span>Loại: {product.selectedVariant}</span>
                                      {/* {product.selectedVariant && product.selectedVariant === product.product.variants._id ? (
                                        
                                      ) : (
                                        <span></span>
                                      )} */}
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
                                        <Image src={voucher} alt="Voucher Mubaha" />
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
                        {selectedVoucher ? (
                          <Image src={voucher2} width={30} height={30} alt="Voucher Mubaha" />
                        ) : (
                          <Image src={voucher} width={30} height={30} alt="Voucher Mubaha" />
                        )}

                        <span className={`${styles.title_name_voucher}`}>Mubaha voucher</span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.selectVoucher}`}>
                    {selectedVoucher ? (
                      <>
                        <div className={`${styles.apply_show_voucher}`}>
                          <div className={`${styles._1oOP8B}`}></div>
                          <div className={`${styles.show_voucher}`}>
                            <span>
                              {" - "}
                              {selectedVoucher.discount.type === "percent" ? (
                                    `${selectedVoucher.discount.amount}%`
                                  ) : (
                                    <NumberFormat
                                      style={{ color: "red" }}
                                      value={selectedVoucher.discount.amount}
                                      thousandSeparator={true}
                                      displayType="text"
                                      suffix={selectedVoucher.currencySymbol}
                                      decimalScale={0}
                                    />
                                  )}
                             
                            </span>
                          </div>
                        </div>
                        <button
                          className={`${styles.btn_change} btn p-0 m-0`}
                          onClick={handleVoucherShow}
                          disabled={cartItems.length === 0}
                        >
                          Chọn Voucher Khác
                        </button>
                      </>
                    ) : (
                      <button
                        className={`${styles.btn_change} btn p-0 m-0`}
                        onClick={handleVoucherShow}
                        disabled={cartItems.length === 0}
                      >
                        Chọn Voucher
                      </button>
                    )}
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
                          disabled={cartItems.length === 0}
                          checked={paymentMethod === "cod"}
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
                          disabled={cartItems.length === 0}
                          checked={paymentMethod === "atm"}
                        />
                        <span>
                          <div className={`${styles.method_content_name}`}>
                            <img
                              width="32px"
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg"
                            />

                            <span>Thanh toán bằng thẻ quốc tế Visa, Master, JCB</span>
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
                          disabled={cartItems.length === 0}
                          checked={paymentMethod === "paypal"}
                        />
                        <span>
                          <div className={`${styles.method_content_name}`}>
                            <img
                              width="32px"
                              src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
                            />
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
                          disabled={cartItems.length === 0}
                          checked={paymentMethod === "vnpay"}
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
                  {cartItems && cartItems.length > 0 && (
                    <>
                      <div
                        className={`${styles.total_title_price} ${styles.title_each_total} ${styles.total_amount}`}
                      >
                        Tổng tiền hàng
                      </div>
                      <div
                        className={`${styles.total_title_price} ${styles.total_amount} ${styles.prices}`}
                      >
                        ₫{totalPriceProduct}
                      </div>
                      <div
                        className={`${styles.total_title_price} ${styles.title_each_total} ${styles.transport_fee}`}
                      >
                        Phí vận chuyển
                      </div>
                      <div
                        className={`${styles.total_title_price} ${styles.transport_fee} ${styles.prices}`}
                      ></div>

                      <div
                        className={`${styles.total_title_price} ${styles.title_each_total} ${styles.total_payment}`}
                      >
                        Tổng thanh toán:
                      </div>
                      <div
                        className={`${styles.total_title_price} ${styles.total_payment} ${styles.prices}`}
                      >
                        <span>₫{totalPrice}</span>
                      </div>
                    </>
                  )}
                  <div className={`${styles.section_button_order}`}>
                    <div className={`${styles.section_rules}`}>
                      <div>
                        Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                        <a href="" target="_blank" rel="noopener noreferrer">
                          Điều khoản Mubaha
                        </a>
                      </div>
                    </div>
                    <button
                      className={
                        cartItems.length === 0
                          ? `${styles.button_order_disabled}`
                          : `${styles.button_order}`
                      }
                      onClick={handleOrder}
                      disabled={cartItems.length === 0}
                    >
                      Đặt hàng
                    </button>
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
        selectedVoucher={selectedVoucher}
      />
    </>
  );
};

export default CheckoutPage;
