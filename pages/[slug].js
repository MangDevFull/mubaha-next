import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Head from "next/head";
import SideProductCart from "../components/SideProductCart";
import { Row, Col, Media, Container, Modal, Input } from "reactstrap";

import RelatedProducts from "../components/RelatedProducts";
import Layout from "../components/Layout";
import ProductTab from "../components/common/product-details/product-tab";
import Services from "../components/common/product-details/services";
import Filter from "../components/common/product-details/filter";

import NumberFormat from "react-number-format";
import CountdownComponent from "../components/common/widgets/countdownComponent";

export default function ProductDetail({ detailProduct, relatedProducts, newProducts }) {
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
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
      variantName: "Blue",
    },
    {
      id: 2,
      className: "bg-light1",
      variantName: "Pink",
    },
    {
      id: 3,
      className: "bg-light2",
      variantName: "Grey",
    },
  ];
  const selectedColor = (colorVariant) => {
    setSelectedVariant(colorVariant.id);
  };

  const [selectedSize, setSlectedSize] = useState();
  const Sizes = [
    {
      id: 1,
      sizeName: "S",
    },
    {
      id: 2,
      sizeName: "M",
    },
    {
      id: 3,
      sizeName: "L",
    },
    {
      id: 4,
      sizeName: "XL",
    },
  ];
  const handleSelectedSize = (size) => {
    setSlectedSize(size.id);
  };

  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);
  const { nav1, nav2 } = state;

  let propertySlider = {
    slidesToShow: 1,
    SlidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };
  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };
  return (
    <>
      <Head>
        <title>{detailProduct.name} | Mubaha</title>
      </Head>
      {/* breadcrumb start */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="page-title">
                <h2>Sản phẩm</h2>
              </div>
            </div>
            <div className="col-sm-6">
              <nav aria-label="breadcrumb" className="theme-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a>Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Sản phẩm
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* breadcrumb start end */}

      {/* section start */}
      <section>
        <div className="collection-wrapper">
          <Container>
            <Row>
              <Col lg={9} sm={12} xs={12}>
                <div className="container-fluid">
                  <Row>
                    <Col xl={12}>
                      <div className="filter-main-btn mb-2">
                        <span onClick={filterClick} className="filter-btn">
                          <i className="fa fa-filter" aria-hidden="true"></i> filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                  {!detailProduct.media.data || detailProduct.media.length === 0 ? (
                    "loading"
                  ) : (
                    <Row>
                      {/* Slider */}
                      <Col lg={6} className="product-thumbnail">
                        <Slider
                          {...propertySlider}
                          asNavFor={nav2}
                          ref={(slider) => (slider1.current = slider)}
                          className="product-slick"
                        >
                          {detailProduct.media.data.map((item) => (
                            <Media
                              key={item._id}
                              src={item.path}
                              alt=""
                              className="img-fluid blur-up lazyload"
                            />
                          ))}
                        </Slider>
                        <Slider
                          className="slider-nav"
                          {...productsnav}
                          asNavFor={nav1}
                          ref={(slider) => (slider2.current = slider)}
                        >
                          {detailProduct.media.data.map((item) => (
                            <Media
                              key={item._id}
                              src={item.path}
                              alt=""
                              className="img-fluid blur-up lazyload"
                            />
                          ))}
                        </Slider>
                      </Col>
                      {/* Slider end*/}
                      <Col lg={6} className="rtl-text">
                        {/* DetailsWithPrice */}
                        <div className="product-right">
                          <div className="product-count">Chi tiết sản phẩm</div>
                          <h2>{detailProduct?.name}</h2>
                          <div className="rating-section">
                            <div className="rating">
                              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
                              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
                              <i className="fa fa-star" />
                            </div>
                            <h6>120 đánh giá</h6>
                          </div>
                          <div className="label-section">
                            <span className="badge badge-grey-color">#1 Best seller</span>
                            <span className="label-text">in fashion</span>
                          </div>
                          <h3 className="price-detail">
                            <NumberFormat
                              value={detailProduct.currentPrice}
                              thousandSeparator={true}
                              displayType="text"
                              suffix={detailProduct.currencySymbol}
                              decimalScale={0}
                            />{" "}
                            {detailProduct.discountPercent > 0 && (
                              <del>
                                <NumberFormat
                                  value={detailProduct.price}
                                  thousandSeparator={true}
                                  displayType="text"
                                  suffix={detailProduct.currencySymbol}
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
                                    ? {
                                        width: "81px !important",
                                        height: "34px",
                                        border: "1px solid #ffa200",
                                        borderRadius: "0",
                                        marginRight: "10px",
                                        textAlign: "center",
                                        lineHeight: "2.3",
                                        color: "#ffa200",
                                      }
                                    : {
                                        width: "81px !important",
                                        height: "34px",
                                        border: "1px solid rgba(0,0,0,.09)",
                                        borderRadius: "0",
                                        marginRight: "10px",
                                        textAlign: "center",
                                        lineHeight: "2.3",
                                      }
                                }
                                key={colorVariant.id}
                                checked={selectedVariant === colorVariant.id}
                                onClick={() => selectedColor(colorVariant)}
                              >
                                {colorVariant.variantName}
                              </li>
                            ))}
                          </ul>
                          <div
                            id="selectSize"
                            className="addeffect-section product-description border-product"
                          >
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
                                    {size.sizeName}
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
                                  onChange={changeQty}
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
                              <a
                                style={{ margin: "0px" }}
                                id="cartEffect"
                                className="btn btn-solid btn-animation"
                              >
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

                            <p id="demo">{detailProduct.description}</p>
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
                      </Col>
                    </Row>
                  )}
                </div>
                {/* Product Tab */}
                <ProductTab />
                {/* Product Tab end */}
              </Col>
              <Col sm={3} className="collection-filter">
                <Filter />
                {/* Services */}
                <Services />
                {/* Services end */}
                {/* side-bar single product slider start */}
                <div className="theme-card">
                  <h5 className="title-border">new product</h5>
                  <Slider slidesPerRow={5} className="offer-slider slide-1">
                    {newProducts.map((product) => {
                      return <SideProductCart key={product._id} product={product} />;
                    })}
                  </Slider>
                </div>
                {/* side-bar single product slider end */}
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* Section ends */}
      <RelatedProducts data={relatedProducts} />
    </>
  );
}

ProductDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  // const response = await API.instance.get(`/products/${slug}`)
  // const data = response.data.data

  const response = await fetch(`${process.env.API_URL}/products/${slug}`);
  const { data, status, message } = await response.json();

  if(status != 200) return {
    notFound: true,
  }

  return {
    props: {
      detailProduct: data.detailProduct,
      relatedProducts: data.relatedProducts,
      newProducts: data.newProducts,
    }, // will be passed to the page component as props
  };
}
