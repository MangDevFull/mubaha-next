import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Head from "next/head";
import SideProductCart from "../components/SideProductCart";
import { Row, Col, Media, Container } from "reactstrap";
import { useRouter } from "next/router";
import RelatedProducts from "../components/RelatedProducts";
import Layout from "../components/Layout";
import ProductTab from "./product-details/common/product-tab";
import Services from "./product-details/common/services";
import DetailsWithPrice from "./product-details/common/detail-price";
import Filter from "./product-details/common/filter";

export default function ProductDetail({ detailProduct, relatedProducts, newProducts }) {
  const router = useRouter();
  // const { slug } = router.query;
  // const products = product.products.splice(0, 20);

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
        <title>{detailProduct.name}</title>
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
                        <DetailsWithPrice data={detailProduct} />
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
  const { data } = await response.json();

  return {
    props: {
      detailProduct: data.detailProduct,
      relatedProducts: data.relatedProducts,
      newProducts: data.newProducts,
    }, // will be passed to the page component as props
  };
}