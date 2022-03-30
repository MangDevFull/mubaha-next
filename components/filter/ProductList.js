import React, { useState } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import ProductItem from "./ProductBox.js";


const ProductList = ({ colClass, layoutList, products, totalProduct,handleLimit }) => {
  const [grid, setGrid] = useState(colClass);
  const [layout, setLayout] = useState(layoutList);

  return (
    <Col className="collection-content" style={{ backgroundColor: 'white' }}>
      <div className="page-main-content" >
        <Row>
          <Col sm="12">
            <Row>
              <Col xs="12" >
                <ul className="product-filter-tags mt-3">
                  <li >
                  <a href={null} className="filter_tag" role="button">
                      text
                      <i className="fa fa-close"></i>
                    </a>
                    <a href={null} className="filter_tag" role="button">
                      Cate
                      <i className="fa fa-close"></i>
                    </a>
                    <a href={null} className="filter_tag" role="button">
                      noi ban
                      <i className="fa fa-close"></i>
                    </a>
                    <a href={null} className="filter_tag" role="button">
                      danh gia
                      <i className="fa fa-close"></i>
                    </a>
                    <a href={null} className="filter_tag" role="button">
                      thuong hieu
                      <i className="fa fa-close"></i>
                    </a>
                    <a href={null} className="filter_tag" role="button">
                      gia
                      <i className="fa fa-close"></i>
                    </a>
                  </li>

                </ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">

                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          Hiển Thị {products.length} Trên {totalProduct} Sản Phẩm
                        </h5>
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { opacity: 0 }
                            : { opacity: 1 }
                        }
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/icon/3.png`}
                              alt="aaa"
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select
                          onChange={(e) => handleLimit(e.target.value)}
                        >
                          <option value="20">20 sản phẩm trên trang</option>
                          <option value="25">25 sản phẩm trên trang</option>
                          <option value="30">30 sản phẩm trên trang</option>
                        </select>
                      </div>
                      <div className="product-page-filter">
                        <select onChange={(e) => setSortBy(e.target.value)}>
                          <option value="AscOrder">Phổ biến</option>
                          <option value="HighToLow">Cao tới thấp</option>
                          <option value="LowToHigh">Thấp tới cao</option>
                          <option value="Newest">Mới nhất</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                {!products || !products || products.length === 0 ? (
                  products && products && products.length === 0 ? (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Không có sản phẩm nào</strong>
                            </h3>
                          </div>
                        </div>
                      </Col>
                    ) : (
                      <div className="row mx-0 margin-default mt-4">
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                      </div>
                    )
                  ) : (
                    products.map((p, i) => {
                    return (
                      <div className={grid} key={i}>
                        <div className="product">
                          <div>
                            <ProductItem
                              des={true}
                              product={p}
                              cartClass="cart-info cart-wrap"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })
                  )}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;