import React, { useState } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import ProductItem from "./ProductBox.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const ProductList = ({ colClass, layoutList, products, totalProduct, handleLimit, handlePaging, hasNextPage, text,hanldeOrder }) => {
  const [grid, setGrid] = useState(colClass);
  const [layout, setLayout] = useState(layoutList);
  return (
    <Col className="collection-content pl-5 pr-5" style={{ backgroundColor: 'white' }}>
      <div className="page-main-content" >
        <Row>
          <Col sm="12">
            <Row>
              <Col xs="12" >
                <div className="mt-4 mb-4 ml-4">
                  <h3>Kết quả tìm kiếm cho: <strong>{text}</strong></h3>
                </div>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">

                {products.length > 0
                  ?
                  <>
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
                            <select onChange={(e) => {hanldeOrder(e)}}>
                              <option >Phổ biến</option>
                              <option >Cao tới thấp</option>
                              <option >Thấp tới cao</option>
                              <option >Mới nhất</option>
                            </select>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </>
                  :
                  ""
                }
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
                    <InfiniteScroll
                      dataLength={products.length}
                      next={handlePaging}
                      hasMore={hasNextPage}
                      loader={
                        <Row className="mb-4">
                          <div className={grid}>
                            <div className="product">
                              <Skeleton count={1} height={250} />
                            </div>
                          </div>
                          <div className={grid}>
                            <div className="product">
                              <Skeleton count={1} height={250} />
                            </div>
                          </div>
                          <div className={grid}>
                            <div className="product">
                              <Skeleton count={1} height={250} />
                            </div>
                          </div>
                          <div className={grid}>
                            <div className="product">
                              <Skeleton count={1} height={250} />
                            </div>
                          </div>
                        </Row>
                      }
                    >
                      <Row>
                        {products.map((p, i) => {
                          return (
                            <div className={grid} key={i}>
                              <div className="product">
                                <ProductItem
                                  des={true}
                                  product={p}
                                  cartClass="cart-info cart-wrap"
                                />
                              </div>
                            </div>
                          )
                        })}
                      </Row>
                    </InfiniteScroll>
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