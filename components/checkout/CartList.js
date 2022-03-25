import React from "react";
import Image from "next/image";
import styles from "../../styles/checkout.module.css";
import NumberFormat from "react-number-format";
import voucher from "../../assets/images/checkout/icon-voucher.svg";

const CartList = ({ vendor }) => {
  return (
    <div className={`${styles.total_price_information}`}>
      <div>
        <div className={`${styles.detail_order_information}`}>
          <div className={`${styles.vendor_name}`}>
            <span>{vendor.vendor.brandName}</span>
          </div>
          <div className={`${styles.section_order_info}`}>
            {vendor.products.map((product, i) => {
              return (
                <div key={i}>
                  <div className={`${styles.order_info}`}>
                    <div className={`${styles.title_info} ${styles.title_image_product}`}>
                      <img width="40px" src={product.product.media.featuredImage} />
                      <span>
                        <span className={`${styles.name_product}`}>{product.product.name}</span>
                      </span>
                    </div>

                    <div className={`${styles.title_info} ${styles.classify_info}`}>
                      {product.selectedVariant === null ? (
                        ""
                      ) : product.selectedAttribute === null ? (
                        <span>Loại: {product.selectedVariant.name}</span>
                      ) : (
                        <span>
                          Loại: {product.selectedVariant.name} - {product.selectedAttribute.name}
                        </span>
                      )}
                    </div>
                    <div className={`${styles.title_info}`}>
                      <NumberFormat
                        value={(1 - product.discount) * product.price}
                        thousandSeparator={true}
                        displayType="text"
                        suffix={product.product.currencySymbol}
                        decimalScale={0}
                      />
                    </div>
                    <div className={`${styles.title_info}`}>{product.amount}</div>
                    <div className={`${styles.title_info}`}>
                      <NumberFormat
                        value={(1 - product.discount) * product.price * product.amount}
                        thousandSeparator={true}
                        displayType="text"
                        suffix={product.product.currencySymbol}
                        decimalScale={0}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
  );
};

export default CartList;