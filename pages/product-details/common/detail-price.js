import { blue } from "@material-ui/core/colors";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";

const DetailsWithPrice = ({ data }) => {
  console.log(data);
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleCrease = () => {
    if (quantity < 2) return;
    setQuantity(quantity - 1);
  };
  const [selectedVariant, setSelectedVariant] = useState();
  // console.log(selectedVariant);
  const colorVariants = [
    {
      id: 1,
      className: "bg-light0",
      name: "Blue",
    },
    {
      id: 2,
      className: "bg-light1",
      name: "Pink",
    },
    {
      id: 3,
      className: "bg-light2",
      name: "Grey",
    },
  ];
  const selectedColor = (colorVariant) => {
    setSelectedVariant(colorVariant.id);
  };

  const [selectedSize, setSlectedSize] = useState();
  const Sizes = [
    {
      id: 1,
      name: "S",
    },
    {
      id: 2,
      name: "M",
    },
    {
      id: 3,
      name: "L",
    },
    {
      id: 4,
      name: "XL",
    },
  ];
  const handleSelectedSize = (size) => {
    setSlectedSize(size.id);
  };
  return (
    <>
      <div className="product-right">
        <div className="product-count">Chi tiết sản phẩm</div>
        <h2>{data.name}</h2>
        <div className="rating-section">
          <div className="rating">
            <i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
            <i className="fa fa-star" /> <i className="fa fa-star" />
          </div>
          <h6>120 đánh giá</h6>
        </div>
        <div className="label-section">
          <span className="badge badge-grey-color">#1 Best seller</span>
          <span className="label-text">in fashion</span>
        </div>
        <h3 className="price-detail">
          <NumberFormat
            value={data.currentPrice}
            thousandSeparator={true}
            displayType="text"
            suffix={data.currencySymbol}
            decimalScale={0}
          />{" "}
          {data.discountPercent > 0 && (
            <del>
              <NumberFormat
                value={data.price}
                thousandSeparator={true}
                displayType="text"
                suffix={data.currencySymbol}
                decimalScale={0}
              />
            </del>
          )}
        </h3>
        <ul className="color-variant">
          {colorVariants.map((colorVariant) => (
            <li
              style={
                selectedVariant === colorVariant.id
                  ? { width: "81px !important",
                  height: "34px",
                  border: "1px solid #ffa200",
                  borderRadius: "0",
                  marginRight: "10px",
                  textAlign: "center",
                  lineHeight: "2.3",
                  color: "#ffa200" }
                  : {
                      width: "81px !important",
                      height: "34px",
                      border: "1px solid rgba(0,0,0,.09)",
                      borderRadius: "0",
                      marginRight: "10px",
                      textAlign: "center",
                      lineHeight: "2.3"
                    }
              }
              key={colorVariant.id}
              checked={selectedVariant === colorVariant.id}
              onClick={() => selectedColor(colorVariant)}
            >
              {colorVariant.name}
            </li>
          ))}
        </ul>
        <div id="selectSize" className="addeffect-section product-description border-product">
          <h6 className="product-title size-text">
            Lựa chọn kích thước
            <span>
              <a
                href={null}
                data-bs-toggle="modal"
                data-bs-target="#sizemodal"
                // onClick={toggle}
              >
                Bảng kích thước
              </a>
            </span>
          </h6>
          <Modal
            className="modal fade"
            id="sizemodal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Sheer Straight Kurta
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    src="../assets/images/size-chart.jpg"
                    alt=""
                    className="img-fluid blur-up lazyload"
                  />
                </div>
              </div>
            </div>
          </Modal>

          <div className="size-box">
            <ul>
              {Sizes.map((size) => (
                <li
                  style={
                    selectedSize === size.id
                      ? { lineHeight: 2.3, border: "1px solid #ffa200" }
                      : { lineHeight: 2.3 }
                  }
                  checked={selectedSize === size.id}
                  key={size.id}
                  onClick={() => handleSelectedSize(size)}
                >
                  {size.name}
                </li>
              ))}
            </ul>
          </div>
          <h6 className="product-title">Số lượng</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  // onClick={minusQty}
                  onClick={handleCrease}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={quantity}
                min={1}
                // onChange={changeQty}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  // onClick={() => plusQty(product)}
                  onClick={handleIncrease}
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
          <button
            style={{
              background: "transparent",
              border: "0px",
              padding: "0px",
            }}
          >
            <a style={{ margin: "0px" }} id="cartEffect" className="btn btn-solid btn-animation">
              <i className="fa fa-shopping-cart mx-2" aria-hidden="true" />
              Thêm giỏ hàng
            </a>
          </button>
          <button
            style={{
              background: "transparent",
              border: "0px",
              padding: "1px 6px 1px 0px",
            }}
          >
            <a className="btn btn-solid">
              <i className="fa fa-bookmark fz-16 mx-2" aria-hidden="true" />
              Mua ngay
            </a>
          </button>
        </div>

        <div className="border-product">
          <h6 className="product-title">Chi tiết sản phẩm</h6>

          <p id="demo">{data.description}</p>
        </div>

        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <ul className="product-social">
              <li>
                <a>
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-google-plus" />
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-instagram" />
                </a>
              </li>
              <li>
                <a>
                  <i className="fa fa-rss" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
