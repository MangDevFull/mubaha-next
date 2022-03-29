import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import ProductItem from "./ProductBox.js";
import { useRouter } from "next/router";


const ProductList = ({ colClass, layoutList, openSidebar, noSidebar }) => {
  const [grid, setGrid] = useState(colClass);
  const [layout, setLayout] = useState(layoutList);

  const handlePagination = () => {
    setIsLoading(true);
    setTimeout(
      () =>
        fetchMore({
          variables: {
            indexFrom: data.products.items.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            setIsLoading(false);
            return {
              products: {
                __typename: prev.products.__typename,
                total: prev.products.total,
                items: [
                  ...prev.products.items,
                  ...fetchMoreResult.products.items,
                ],
                hasMore: fetchMoreResult.products.hasMore,
              },
            };
          },
        }),
      1000
    );
  };

  const removeBrand = (val) => {
    const temp = [...selectedBrands];
    temp.splice(selectedBrands.indexOf(val), 1);
    filterContext.setSelectedBrands(temp);
  };

  const removeSize = (val) => {
    const temp = [...selectedSize];
    temp.splice(selectedSize.indexOf(val), 1);
    filterContext.setSelectedSize(temp);
  };

  const removeColor = () => {
    filterContext.setSelectedColor("");
  };

  return (
    <Col className="collection-content" style={{ backgroundColor: 'white' }}>
      <div className="page-main-content" >
        <Row>
          <Col sm="12">
            <Row>
              <Col xs="12" >
                <ul className="product-filter-tags mt-3">
                  <li >
                    <a href={null} className="filter_tag">
                      aaaa
                      <i
                        className="fa fa-close"
                        onClick={() => removeBrand()}
                      ></i>
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
                 
                            Showing Products 

        
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
                          onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                          <option value="10">10 sản phẩm trên trang</option>
                          <option value="15">15 sản phẩm trên trang</option>
                          <option value="20">20 sản phẩm trên trang</option>
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
                  <div>
                    <div className="product">
                      <div>
                        <ProductItem
                          des={true}
                          cartClass="cart-info cart-wrap"
                        />
                      </div>
                    </div>
                  </div>
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