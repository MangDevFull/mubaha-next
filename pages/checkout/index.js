import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Container, Modal, Button, ModalBody, ModalFooter, Row } from "reactstrap";
import styles from "../../styles/checkout.module.css";
import CartList from "@/components/checkout/CartList";
import VoucherShop from "@/components/checkout/VoucherShop";
import CommonLayout from "../../components/shop/CommonLayout";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import _ from "lodash";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import visa from "../../assets/images/checkout/visa.png";
import AdressList from "@/components/checkout/AddressList";
import TotalPrice from "@/components/checkout/TotalPrice";

const Checkout = ({ data }) => {
  const { data: session } = useSession();
  const [showVoucher, setShowVoucher] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [vouchers, setVouchers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [succesPayment, setSuccesPayment] = useState(false);
  const [cardCode, setCardCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");

  const [selectedVoucher, setSelectedVoucher] = useState();
  const [groupedItems, setGroupedItems] = useState([]);
  const [listAddress, setListAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();

  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [chooseAddress, setChooseAddress] = useState();
  const [showError, setShowError] = useState(false);
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);

  const router = useRouter();
  useEffect(() => {
    let _timeout;
    if (session) {
      handleGetListAddress();
      if (data !== null) {
        setGroupedItems(data.grouped);
        setTotalPriceProduct(data.totalOrdersPrice);
      } else {
        setShowError(true);

        _timeout = setTimeout(() => {
          router.push("/cart");
        }, 2000);
      }
    }

    return () => {
      clearTimeout(_timeout);
    };
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
    console.log(voucher);
  };

  const handleSelectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === "atm") setShowCard(true);
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

  const handlePaymentMedthod = () => {
    setShowCard(false);
    setSuccesPayment(true);

    setTimeout(function () {
      setSuccesPayment(false);

      // router.push("/");
    }, 1000);
  };

  const handleOrder = async (e) => {
    const cartID = [];
    const voucherID = [];

    groupedItems.forEach((p) => {
      cartID = [...p.products.map((x) => x._id)];
    });
    if (selectedVoucher) voucherID.push(selectedVoucher._id);

    // console.log(cartID);

    const payload = {
      cartItemIds: cartID,
      method: paymentMethod,
      address: selectedAddress._id,
      voucherIds: voucherID,
      // cardCode,
      // cardNumber,
      // cardName,
      // expirationDate: cardExp,
    };
    setVisible(true);
    console.log(session);

    const response = await fetch(`${process.env.API_ORDER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
    const data = await response.json();
    if (data.status === 200) {
      setTimeout(function () {
        setVisible(false);
        router.push("/");
      }, 3000);
    } else {
      console.log(data);
      // alert(data.data);
    }
  };
  const handleCloseCreateAdd = (data, setChecked) => {
    setShow(false);
    handleUpdateAddAddress(data);
  };
  const handleShow = () => {
    setShow(true);
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

  return (
    <>
      <HeaderAuthen />
      <CommonLayout parent="Trang chủ" title="Thanh toán đơn hàng">
        <section className={`section-b-space ${styles.section_checkout_page}`}>
          <Container>
            {showError && (
              <>
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
            <div className={`${styles.address}`}>
              <h4>1. Chọn địa chỉ giao hàng</h4>
              <div className={`${styles.table_address}`}>
                <div className={`${styles.border_top}`}></div>
                <AdressList
                  showAddress={showAddress}
                  listAddress={listAddress}
                  chooseAddress={chooseAddress}
                  setChooseAddress={setChooseAddress}
                  handleChangeAddress={handleChangeAddress}
                  setShowAddress={setShowAddress}
                  selectedAddress={selectedAddress}
                  show={show}
                  handleCloseCreateAdd={handleCloseCreateAdd}
                  handleShow={handleShow}
                />
                <div className={`${styles.border_top}`}></div>
              </div>
            </div>
            <div className={`${styles.list_cart}`}>
              <h4>2. Danh sách đơn hàng</h4>
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
              {groupedItems.length > 0 &&
                groupedItems.map((listCarts, index) => {
                  return (
                    <div key={index}>
                      <CartList listCarts={listCarts} />
                    </div>
                  );
                })}
            </div>
            <div className={`${styles.voucher}`}>
              <h4>3. Chọn Voucher</h4>
              <VoucherShop
                selectedVoucher={selectedVoucher}
                handleVoucherShow={handleVoucherShow}
                groupedItems={groupedItems}
                showVoucher={showVoucher}
                handleCloseVoucher={handleCloseVoucher}
                vouchers={vouchers}
                handleApplyVoucher={handleApplyVoucher}
              />
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
                        disabled={groupedItems.length === 0}
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
                        disabled={groupedItems.length === 0}
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
                        disabled
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
                        disabled={groupedItems.length === 0}
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
              <TotalPrice
                groupedItems={groupedItems}
                totalPriceProduct={totalPriceProduct}
                selectedVoucher={selectedVoucher}
                handleOrder={handleOrder}
                visible={visible}
              />
            </div>
          </Container>
        </section>

        <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={showCard}>
          <div className={`${styles.modal_overlay}`}>
            <div className={`${styles.modal_content}`}>
              <div className={`${styles.card_adding}`}>
                <div className={`${styles.title_adding}`}>Nhập thẻ thanh toán</div>
                <div className={`${styles.card_type_list}`}>
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-visa.png"
                    alt="visa"
                  />
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-credit-type-mastercard.svg"
                    alt="mastercard"
                  />
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-credit-type-jcb.svg"
                    alt="mastercard"
                  />
                </div>
                <div className={`${styles.add_card_form}`}>
                  <div className={`${styles.add_card_form_left}`}>
                    <div className={`${styles.number_card}`}>
                      <div className={`${styles.label_number_card}`}>Số thẻ:</div>
                      <input
                        type="text"
                        name="number"
                        placeholder="VD: 4123456789012345"
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      <div className={`${styles.error_card}`}></div>
                    </div>
                    <div className={`${styles.number_card}`}>
                      <div className={`${styles.label_number_card}`}>Tên in trên thẻ:</div>
                      <input
                        type="text"
                        name="name"
                        placeholder="VD: NGUYEN VAN A"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      />
                      <div className={`${styles.error_card}`}></div>
                    </div>
                    <div className={`${styles.number_card}`}>
                      <div className={`${styles.label_number_card}`}>Ngày hết hạn:</div>
                      <input
                        type="text"
                        name="empiry"
                        placeholder="VD: MM/YY"
                        maxLength={5}
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        // name={dateEnd}
                        // value={format(new Date(dateEnd), "dd/yy")}
                      />
                      <div className={`${styles.error_card}`}></div>
                    </div>
                    <div className={`${styles.number_card}`}>
                      <div className={`${styles.label_number_card}`}>Mã bảo mật:</div>
                      <div className={`${styles.wrapper}`}>
                        <input
                          type="text"
                          name="cvc"
                          placeholder="VD: 123"
                          value={cardCode}
                          onChange={(e) => setCardCode(e.target.value)}
                          maxLength={3}
                        />
                        <img
                          className={`${styles.card_back}`}
                          width="61"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/checkout-img-cvv-hint.jpg"
                        />
                      </div>

                      <div className={`${styles.error_card}`}></div>
                    </div>
                  </div>
                  <div className={`${styles.image_card}`}>
                    <img className={`${styles.image_card_visa}`} width="400px" src={visa.src} />
                  </div>
                </div>
                <div className={`${styles.add_card_note}`}>
                  Để đảm bảo an toàn, thông tin thẻ của bạn chỉ được lưu bởi CyberSource, công ty
                  quản lý thanh toán lớn nhất thế giới (thuộc tổ chức VISA)
                </div>
                <div className={`${styles.button_group}`}>
                  <button className={`${styles.back}`} onClick={() => setShowCard(!showCard)}>
                    {" "}
                    Trở Lại
                  </button>
                  <button className={`${styles.confirm}`} onClick={handlePaymentMedthod}>
                    {" "}
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={succesPayment}>
          <ModalBody className="container-fluid">
            <Row className="pl-5 pr-5 pt-3" style={{ justifyContent: "center" }}>
              <h3>Nhập số thẻ thành công</h3>
            </Row>
          </ModalBody>
        </Modal>
      </CommonLayout>
      <Footer />
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const q = context.query;
  const response = await fetch(`${process.env.API_ORDER_URL}/checkout?s=${q.s}&f=${q.f}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const { data } = await response.json();
  return {
    props: {
      data,
    },
  };
}
