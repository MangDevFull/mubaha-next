import React from "react";
import Image from "next/image";
import voucher from "../../assets/images/checkout/icon-voucher.svg";
import voucher2 from "../../assets/images/checkout/icon-voucher-v02.svg";
import styles from "../../styles/checkout.module.css";
import Voucher from "@/components/Voucher";
import NumberFormat from "react-number-format";

const VoucherShop = ({ selectedVoucher, handleVoucherShow, groupedItems, showVoucher, handleCloseVoucher, vouchers , handleApplyVoucher}) => {
  return (
    <>
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
              >
                Chọn Voucher Khác
              </button>
            </>
          ) : (
            <button
              className={`${styles.btn_change} btn p-0 m-0`}
              onClick={handleVoucherShow}
              disabled={groupedItems.length === 0}
            >
              Chọn Voucher
            </button>
          )}
        </div>
      </div>
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

export default VoucherShop;
