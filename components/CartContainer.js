import { useEffect, useState } from "react";
import Link from "next/link";
import { Media } from "reactstrap";
import { useSession } from "next-auth/react";
import CartHeader from "@/components/CartHeader.js";
import styles from "@/styles/cartModal.module.css";
export default function CartContainer({ icon }) {
  const [cartList, setCartList] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchData() {
      if (session != null) {
        const res = await fetch(`${process.env.API_CART_URL}/header`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.accessToken,
          },
        });
        const data = await res.json();
        if (data.status === 200) {
          const products = data.data.map((product, i) => {
            if (product.selectedVariant != null && product.selectedAttribute == null) {
              return {
                ...product.selectedVariant,
                quantity: product.amount,
                name: product.product.name,
                symbol: product.product.currencySymbol,
                image: product.selectedVariant.image,
                slug: product.product.slug,
              };
            } else if (product.selectedVariant != null && product.selectedAttribute != null) {
              return {
                ...product.selectedAttribute,
                quantity: product.amount,
                name: product.product.name,
                symbol: product.product.currencySymbol,
                image: product.selectedVariant.image,
                slug: product.product.slug,
              };
            } else {
              return {
                name: product.product.name,
                price: product.product.price,
                quantity: product.amount,
                name: product.product.name,
                symbol: product.product.currencySymbol,
                image: product.product.media.featuredImage,
                slug: product.product.slug,
                discount: product.product.discount,
              };
            }
          });
          setCartList(products);
        }
      }
    }
    fetchData();
  }, [session]);
  return (
    <>
      <li className="onhover-div mobile-cart">
        <div className="cart-qty-cls">{cartList.length}</div>
        <Link href={`/cart`} passHref>
          <div>
            <Media src="/assets/images/icon/cart.png" className="img-fluid" alt="" />
            <i className="fa fa-shopping-cart"></i>
          </div>
        </Link>
        <ul
          className="show-div shopping-cart"
          style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.12)" }}
        >
          {cartList.map((item, index) => (
            <CartHeader key={index} item={item} />
          ))}
          {cartList.length > 0 ? (
            <div className={styles.form}>
              <li>
                <div className="buttons view-cart d-flex justify-content-end">
                  <Link href={`/page/account/cart`} passHref>
                    <button className="btn btn-solid">Đến giỏ hàng</button>
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
    </>
  );
}
