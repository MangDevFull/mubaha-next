import React, { useContext, useState } from "react";
import {
  Media,
  Container,
  Form,
  Row,
  Input,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
  const [obj, setObj] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showAddress, setShowAddress] = useState("default");
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const router = useRouter();
  const handleClose = () => setShow(false);
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

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };

  const onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  const onError = (err) => {
    console.log("Error!", err);
  };

  const paypalOptions = {
    clientId: "AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_",
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
                  <div class={`${styles.border_top}`}></div>
                  <div class={`${styles.padding_box}`}>
                    <div class={`${styles.title_address}`}>
                      <div class={`${styles.icon_address}`}>
                        <div class={`${styles.icon}`}>
                          <svg height="16" viewBox="0 0 12 16" width="12" fill="#f89922">
                            <path
                              d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div>Địa chỉ giao hàng</div>
                      </div>
                    </div>
                    {showAddress === "change" && (
                      <>
                        <ul>
                          <li>
                            <input
                              type="radio"
                              name="delivery_address"
                              data-view-index="cod"
                              readonly
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
                                <div class={`${styles.default}`}>Mặc định</div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <input
                              type="radio"
                              name="delivery_address"
                              data-view-index="cod"
                              readonly
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
                        <div>
                          <button className={`${styles.btn_change} btn p-0 m-0`}>
                            <Link href="/account">
                              <a>Thiết lập địa chỉ</a>
                            </Link>
                          </button>
                        </div>
                        <div>
                          <button
                            className={`${styles.btn_change} btn p-0 m-0`}
                            onClick={handleShow}
                          >
                            Thêm địa chỉ mới
                          </button>
                        </div>
                        <div>
                          <button className={`${styles.btn_change} btn p-0 m-0`}>Hoàn thành</button>
                        </div>
                        <div>
                          <button
                            className={`${styles.btn_change} btn p-0 m-0`}
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
                            <div class={`${styles.default}`}>Mặc định</div>
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
                  <div class={`${styles.border_top}`}></div>
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
                    <div className={`${styles.title_name}`}>Số lượng</div>
                    <div className={`${styles.title_name}`}>Giá tiền</div>
                    <div className={`${styles.title_name} ${styles.title_price}`}>Thành tiền</div>
                  </div>
                </div>
                <div>
                  <div className={`${styles.total_price_information}`}>
                    <div>
                      <div className={`${styles.detail_order_information}`}>
                        <div className={`${styles.vendor_name}`}>
                          <span>Royal London Official Store</span>
                        </div>
                        <div className="_1oOvbg">
                          <div className={`${styles.title_section}`}>
                            <div className={`${styles.title}`}>
                              <div className={`${styles.title_name} ${styles.title_products}`}>
                                <div className={`${styles.products}`}>Sản phẩm</div>
                              </div>
                              <div
                                className={`${styles.title_name} ${styles.classify_products}`}
                              ></div>
                              <div className={`${styles.title_name}`}>Số lượng</div>
                              <div className={`${styles.title_name}`}>Giá tiền</div>
                              <div className={`${styles.title_name} ${styles.title_price}`}>
                                Thành tiền
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.voucher}`}>
                <h4>3. Chọn Voucher</h4>
                <div className={`${styles._1ru0hU}`}>
                  <div className={`${styles._4zBNu}`}>
                    <div className={`${styles.FgeP4U}`}>
                      <div className={`${styles.t57Ey0}`}>
                        {/* icon voucher */}
                        <span className={`${styles.y4xiL1}`}>Mubaha voucher</span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.selectVoucher}`}>
                    <button className={`${styles.btn_change} btn p-0 m-0`}>Chọn Voucher</button>
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
                          readonly
                          value="cod"
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
                          readonly
                          value="atm"
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
                          readonly
                          value="paypal"
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
                          readonly
                          value="vnpay"
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
                  <div>Tổng tiền hàng</div>
                  <div>₫1.147.000</div>
                  <div>Phí vận chuyển</div>
                  <div>₫70.700</div>
                  <div>Tổng thanh toán:</div>
                  <div>₫1.217.700</div>
                  <div>
                    <div>
                      <div>
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
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
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered isOpen={show}>
        <ModalHeader>Cập nhật địa chỉ</ModalHeader>
        <ModalBody className="container-fluid">
          <div className="col-md-12 mt-3">
            {showMessage && (
              <Alert style={{ textAlign: "center", height: "auto" }} variant={"danger"}>
                {message}
              </Alert>
            )}
          </div>
          <Row className="p-5">
            <form id="add_address">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="productname">Họ và tên</label>
                    <input
                      name="productname"
                      type="text"
                      className="form-control productname"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="number_phone">Số điện thoại</label>
                    <input
                      name="number_phone"
                      type="text"
                      className="form-control number_phone"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="mb-3">
                    <label
                      htmlFor="choices-single-groups"
                      className="form-label font-size-13 text-muted"
                    >
                      Tỉnh/Thành phố
                    </label>
                    <select className="form-control" name="choices-single-groups" required>
                      <option value="">Chọn một tỉnh/thành phố</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="mb-3">
                    <label
                      htmlFor="choices-single-groups"
                      className="form-label font-size-13 text-muted"
                    >
                      Quận/Huyện
                    </label>
                    <select className="form-control" name="choices-single-groups" required>
                      <option value="">Chọn một quận/huyện</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-secondary btn-lg"
            style={{ width: "120px", height: "50px" }}
            onClick={handleClose}
          >
            Huỷ
          </Button>
          <button className="btn-solid btn">Cập nhật</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CheckoutPage;
