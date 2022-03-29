import { useState } from "react";
import Link from "next/link";
import { Row, Col, Media, Modal, ModalBody } from "reactstrap";

import MasterProductDetail from "./common/product-box/MasterProductDetail";

const currency = {
  currency: "VND",
  name: "vietnamdong",
  symbol: "đ",
  value: 1,
};

export default function ProductItem({ product, oldThumbnail }) {
  const [modal, setModal] = useState(false);
  // const [image, setImage] = useState("");
  const uniqueTags = [];

  // const onClickImageHandle = (img) => {
  //   setImage(img);
  // };

  const toggle = () => setModal(!modal);

  return (
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new === true ? <span className="lable3">new</span> : ""}
          {product.discount > 0 ? <span className="lable4">Giảm giá</span> : ""}
        </div>
        <div className="front">
          <Link href={`/${product.slug}`}>
            <a>
              <Media
                src={product.media.featuredImage}
                style={ !oldThumbnail ? {maxHeight: "204px"} : {} }
                className="img-fluid bg-img blur-up"
                alt=""
              />
            </a>
          </Link>
        </div>
        {/* <div className="back">
          <Media
            src={product.media.featuredImage}
            className="img-fluid"
            alt=""
          />
        </div> */}
       
        {/* {product.media.data ? (
          <ul className="product-thumb-list">
            {product.media.data.map((img, i) => (
              <li className={`grid_thumb_img ${img.path === image ? "active" : ""}`} key={i}>
                <a href={null} title="Add to Wishlist">
                  <Media src={`${img.path}`} alt="wishlist" onClick={() => onClickImageHandle(img.path)} />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )} */}
      </div>
      <MasterProductDetail currency={currency} product={product} />
      <Modal isOpen={modal} toggle={toggle} className="modal-lg quickview-modal" centered>
        <ModalBody>
          <Row>
            <Col lg="6" xs="12">
              <div className="quick-view-img">
                <Media
                  src={`${product.media.featuredImage}`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right">
                <Link href={`/${product.slug}`}>
                  <a>
                    <h2>{product.name}</h2>
                  </a>
                </Link>
                <h3>
                  {currency.symbol}
                  {(product.price * currency.value).toFixed(2)}
                </h3>
                {product.variants ? (
                  <ul className="color-variant">
                    {uniqueTags ? (
                      <ul className="color-variant">
                        {uniqueTags.map((vari, i) => {
                          return (
                            <li
                              className={vari.color}
                              key={i}
                              title={vari.color}
                              onClick={() => variantChangeByColor(vari.image_id, product.images)}
                            ></li>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                  </ul>
                ) : (
                  ""
                )}
                <div className="border-product">
                  <h6 className="product-title">product details</h6>
                  <p>{product.description}</p>
                </div>
                <div className="product-description border-product">
                  {product.size ? (
                    <div className="size-box">
                      <ul>
                        {product.size.map((size, i) => {
                          return (
                            <li key={i}>
                              <a href={null}>{size}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <h6 className="product-title">quantity</h6>
                  <div className="qty-box">
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <button
                          type="button"
                          className="btn quantity-left-minus"
                          data-type="minus"
                          data-field=""
                        >
                          <i className="fa fa-angle-left"></i>
                        </button>
                      </span>
                      <input type="text" name="quantity" className="form-control input-number" />
                      <span className="input-group-prepend">
                        <button
                          type="button"
                          className="btn quantity-right-plus"
                          data-type="plus"
                          data-field=""
                        >
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product-buttons">
                  <button className="btn btn-solid" onClick={() => addCart(product)}>
                    add to cart
                  </button>
                  <button className="btn btn-solid">View detail</button>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
