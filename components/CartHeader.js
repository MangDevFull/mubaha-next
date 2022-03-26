import React, { Fragment } from "react";
import Link from "next/link";
import { Media } from "reactstrap";
import NumberFormat from "react-number-format";
const CartHeader = ({ item }) => {

  return (
    <Fragment>
      <li>
        <div className="media d-flex" styles={{height: '100px'}}>
          <Link href={"/" + item.slug}>
            <a>
              <Media alt="" className="mr-3" src={`${item.image}`} />
            </a>
          </Link>
          <div className="media-body d-flex justify-content-between">
            <Link href={"/" + item.slug}>
              <a>
                <h4 style={{color: 'black'}}>{item.name}</h4>
                <span style={{color: 'black'}} >Số lượng: {item.quantity}</span> 
              </a>
            </Link>
            <h5 style={{color: "#f89922"}}>
              <NumberFormat
                value={item.price * (1-item.discount)}
                thousandSeparator={true}
                displayType="text"
                suffix={item.symbol}
                decimalScale={0}
              />
            </h5>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;
