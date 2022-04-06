import React from "react";
import styles from "../../styles/checkout.module.css";
import { Modal, Button, ModalBody, ModalFooter, Row } from "reactstrap";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";

const TotalPrice = ({
  groupedItems,
  totalPriceProduct,
  selectedVoucher,
  handleOrder,
  visible,
  selectedVoucherShop,
  totalOrdersPrice
}) => {
  return (
    <>
      <div className={`${styles.total_prices}`}>
        <div
          className={`${styles.total_title_price} ${styles.title_each_total} ${styles.total_amount}`}
        >
          Tổng tiền hàng
        </div>
        <div className={`${styles.total_title_price} ${styles.total_amount} ${styles.prices}`}>
          <NumberFormat
            value={totalPriceProduct}
            thousandSeparator={true}
            displayType="text"
            suffix="₫"
            decimalScale={0}
          />
        </div>
        
       
        <div
          className={`${styles.total_title_price} ${styles.title_each_total} ${styles.transport_fee}`}
        >
          Tổng Voucher giảm giá của Shop:
        </div>
        <div className={`${styles.total_title_price} ${styles.transport_fee} ${styles.prices}`}>
          <NumberFormat
            style={{ color: "red" }}
            value={0}
            thousandSeparator={true}
            displayType="text"
            prefix="-"
            suffix={selectedVoucherShop.currencySymbol}
            decimalScale={0}
          />
        </div>

        <div
          className={`${styles.total_title_price} ${styles.title_each_total} ${styles.total_payment}`}
        >
          Tổng thanh toán:
        </div>
        <div className={`${styles.total_title_price} ${styles.total_payment} ${styles.prices}`}>
          <span>
            <NumberFormat
              value={totalOrdersPrice}
              thousandSeparator={true}
              displayType="text"
              suffix="₫"
              decimalScale={0}
            />
          </span>
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

          <button
            className={
              groupedItems.length === 0
                ? `${styles.button_order_disabled}`
                : `${styles.button_order}`
            }
            onClick={handleOrder}
            disabled={groupedItems.length === 0}
          >
            Đặt hàng
          </button>
        </div>
      </div>
      <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={visible}>
        <ModalBody className="container-fluid">
          <Row className="pl-5 pr-5 pt-3" style={{ justifyContent: "center" }}>
            <h3>Đặt hàng thành công</h3>
          </Row>
        </ModalBody>
        <ModalFooter style={{ border: "none" }}>
          <Button
            className="btn btn-secondary btn-lg"
            style={{ width: "100%", maxWidth: "100%", borderRadius: "5px" }}
            onClick={() => router.push("/")}
          >
            Trở về trang chủ
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TotalPrice;
