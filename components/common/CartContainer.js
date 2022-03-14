import {useContext} from "react";
import Link from "next/link";
import {Media} from "reactstrap"

export default function CartContainer({icon}) {

  return (
    <>
      <li className="onhover-div mobile-cart">
        <div className="cart-qty-cls">0</div>
        <Link href={`/cart`} passHref>
          <div>
            <Media src="/assets/images/icon/cart.png" className="img-fluid" alt="" />
            <i className="fa fa-shopping-cart"></i>
          </div>
        </Link>
        {/* <ul className="show-div shopping-cart">
          {cartList.map((item, index) => (
            <CartHeader key={index} item={item} total={total} symbol={symbol} />
          ))}
          {cartList.length > 0 ? (
            <div>
              <li>
                <div className="total">
                  <h5>
                    subtotal :{" "}
                    <span>
                      {symbol}
                      {total}
                    </span>
                  </h5>
                </div>
              </li>
              <li>
                <div className="buttons view-cart">
                  <Link href={`/page/account/cart`}>
                    <a>view cart</a>
                  </Link>
                  <Link href={`/page/account/checkout`}>
                    <a className="checkout">checkout</a>
                  </Link>
                </div>
              </li>
            </div>
          ) : (
            <li>
              <h5>Your cart is currently empty.</h5>
            </li>
          )}
        </ul> */}
      </li>
    </>
  )
}