import { useEffect, useState } from "react";
import Link from "next/link";
import { Media } from "reactstrap";
import { useSession } from "next-auth/react";
import CartHeader from "@/components/CartHeader.js";
import styles from "@/styles/cartModal.module.css";
import useSWR from "swr";
import fetcherToken from "../libs/fetcherToken"
export default function CartContainer({ icon }) {
  const { data: session } = useSession();
  const getTootalCart = useSWR([`${process.env.API_CART_URL}/header`, session?.accessToken], fetcherToken,{
    refreshInterval: 1000
  })
  return (
    <>
      {getTootalCart.data && session != null ?
        <li className="onhover-div mobile-cart">
          <div className="cart-qty-cls">{getTootalCart.data.data.totalCartItems}</div>
          <Link href={`/cart`} passHref>
            <div>
              <Media src="/assets/images/icon/cart.png" className="img-fluid" alt="" />
              <i className="fa fa-shopping-cart"></i>
            </div>
          </Link>
          <ul
            className="show-div shopping-cart pb-0 pl-0 pr-0 pt-0"
            style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.12)" }}
          >
           { getTootalCart.data.data.totalCartItems > 0 &&
            <div className={styles.form2}>

<div className="buttons view-cart d-flex justify-content-between">
  <p style={{ color: 'black' }} className="mt-3 ml-2">
    {getTootalCart.data.data.carts.length} sản phẩm thêm gần nhất
  </p>

</div>

</div>
           }
            {getTootalCart.data.data.carts.map((item, index) => (
              <CartHeader key={index} item={item} />
            ))}
            {getTootalCart.data.data.totalCartItems > 0 ? (
              <div className={styles.form}>
                <li>
                  <div className="buttons view-cart d-flex justify-content-between">
                    <p style={{ color: 'black' }} className="mt-3 ml-2">
                      Còn {getTootalCart.data.data.totalViewMore} sản phẩm trong giỏ hàng
                    </p>
                    <Link href={`/cart`} passHref>
                      <button className="btn mr-2">Xem giỏ hàng</button>
                    </Link>
                  </div>
                </li>
              </div>
            ) : (
              <li>
                <Media
                  src="/assets/icon/cart-is-empty-800x800.png"
                  className="img-fluid mx-auto"
                  alt="mubaha.com"
                  style={{ width: "100px", maxWidth: "100px" }}
                />
                <h5 className="text-center" style={{ color: "black" }}>
                  Bạn chưa có sản phẩm
                </h5>
              </li>
            )}
          </ul>
        </li>
        : ""
      }
    </>
  );
}
