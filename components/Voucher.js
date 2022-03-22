import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import styles from "@/components/common/CheckoutPage.module.css";
import NumberFormat from "react-number-format";
import format from 'date-fns/format'

const Voucher = ({ isOpen, handleCloseVoucher, vouchers, handleApplyVoucher }) => {

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered isOpen={isOpen}>
      <ModalHeader>Chọn Mubaha Voucher</ModalHeader>
      <ModalBody>
        <div className={`${styles.modal_voucher}`}>
          <div className={`${styles._38kqI1}`}>
            <span>Mã voucher</span>
            <div className={`${styles._3K7VlY}`}>
              <div className={`${styles.input_with_validator}`}>
                <input type="text" placeholder="Mã Mubaha Voucher" maxLength="255" />
              </div>
            </div>
            <button className={`${styles.button_apply}`}>
              <span>Áp dụng</span>
            </button>
          </div>
          <div className={`${styles._2ZPmGW}`}>
            <div className={`${styles._1eqk4K}`}>
              mã miễn phí vận chuyển và mã giảm giá đơn hàng
            </div>

            {vouchers.docs &&
              vouchers.docs.length > 0 &&
              vouchers.docs.map((voucher, index) => {
              
                return (
                  <div key={index}>
                    <div className={`${styles._3R4rbT}`}>
                      <div className={`${styles._3L2qYK}`}>
                        <div className={`${styles._1DZArM}`}>
                          <div>{voucher.title}</div>
                        </div>
                        <div className={`${styles.PT6ffQ}`}>
                          <div className={`${styles._3sw7sh}`}>
                            <div className={`${styles._1g6Th3}`}>
                              <span>Áp dụng cho một số shop nhất định</span>
                            </div>
                            <div className={`${styles._2ocsGB}`}>
                              <div className={`${styles._10zVWC}`}>
                                <div className={`${styles._36sEF5}`}>Đơn hàng từ 0Đ</div>
                              </div>
                            </div>
                            <span>
                              HSD: {format(new Date(voucher.endDate), "MM/dd/yyyy")}
                            </span>
                          </div>
                          <div className={`${styles._K4Yt}`}>
                            <button className={`${styles.button_apply}`} onClick={() => handleApplyVoucher(voucher)}>
                              <span>Áp dụng</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="btn btn-secondary btn-lg"
          style={{ width: "120px", height: "50px" }}
          onClick={handleCloseVoucher}
        >
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Voucher;
