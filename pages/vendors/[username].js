import React, { useState } from "react";
import CommonLayout from "../../components/shop/CommonLayout.js";
import seventeen from "../../public/assets/images/logos/17.png";
import Layout from "../../components/Layout";
import { Container, Col, Row, Media, Button, Spinner } from "reactstrap";
import FilterPage from "../../components/shop/common/Filter.js";
import Menu2 from "../../public/assets/images/mega-menu/2.jpg";
import PostLoader from "../../components/common/PostLoader";
import ProductItem2 from "../../components/common/product-box/ProductBox1.js";
import ProductList from "../../components/shop/common/ProductList";

const VenderProfile = ({
  vendorProfile,
  products,
  newProducts,
  layoutList,
  noSidebar,
  username,
}) => {
  const [layout, setLayout] = useState(layoutList);
  const [grid, setGrid] = useState("col-xl-3 col-md-6 col-grid-box");
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("AscOrder");
  const [visible, setVisible] = useState(8);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8)
  const [listProduct, setListProduct] = useState(products.docs);
  

  const handlePagination = async () => {
    try {
      setPage(page + 1);
      const respone = await fetch(
        `${process.env.API_URL}/vendors/${username}?limit=${limit}&page=${page + 1}&maxPrice=10000000&minPrice=0`
      );
      const { data, status, message } = await respone.json();
      const { products } = data;
      var newListProduct = listProduct.concat(products.docs);
      setListProduct(newListProduct);
    } catch (error) {
      console.log(error);
    }
    // setVisible((prevValue) => prevValue + 8)
  };
  
  const [sidebarView, setSidebarView] = useState(false);

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  const handleCallApi = async (limit,page,maxPrice,minPrice) =>{
    try {
      setPage(page + 1);
      const respone = await fetch(
        `${process.env.API_URL}/vendors/${username}?limit=${limit}&page=${page + 1}&maxPrice=10000000&minPrice=0`
      );
      const { data, status, message } = await respone.json();
      const { products } = data;
      setListProduct(products.docs);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <CommonLayout parent="Trang chủ" title="Hồ sơ người bán">
        <div className="vendor-cover">
          <div
            className="bg-size"
            style={{ backgroundImage: "url(" + vendorProfile.cover + ")" }}
          ></div>
        </div>
        <section className="vendor-profile pt-0">
          <Container>
            <Row>
              <Col lg="12">
                <div className="profile-left">
                  <div className="profile-image">
                    <div>
                      <Media src={seventeen.src} alt="" className="img-fluid" />
                      <h3>{vendorProfile.brandName}</h3>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <h6>750 followers | 10 review</h6>
                      </div>
                    </div>
                  </div>
                  <div className="profile-detail">
                    <div>
                      <p>{vendorProfile.details}</p>
                    </div>
                  </div>
                  <div className="vendor-contact">
                    <div>
                      <h6>Theo dõi chúng tôi:</h6>
                      <div className="footer-social">
                        <ul>
                          <li>
                            <a href={vendorProfile.socialLinks.facebook}>
                              <i className="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li>
                            <a href={vendorProfile.socialLinks.youtube}>
                              <i className="fa fa-youtube" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li>
                            <a href={vendorProfile.socialLinks.tiktok}>
                              <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li>
                            <a href={vendorProfile.socialLinks.instagram}>
                              <i className="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h6>Nếu bạn có câu hỏi thắc mắc:</h6>
                      <a href="#" className="btn btn-solid btn-sm">
                        Liên hệ
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section-b-space ratio_asos">
          <div className="collection-wrapper">
            <Container>
              <Row>
                <FilterPage
                  sm="3"
                  sidebarView={sidebarView}
                  closeSidebar={() => openCloseSidebar(sidebarView)}
                  newProducts={newProducts}
                />

<Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <div className="top-banner-wrapper">
              <a href={null}>
                <Media src={Menu2.src} className="img-fluid blur-up lazyload" alt="" />
              </a>
              <div className="top-banner-content small-section">
                <h4>Thời trang</h4>
                <h5>
                  Shop khuyến khích các bạn sử dụng mã Freeship Extra để được giảm tiền ship tối đa
                </h5>
                <p>
                  Fear of God (FOG) được ra mắt vào năm 2012, bởi Jerry Lorenzo - một ông bố trẻ
                  tuổi trước đó chưa hề theo học một khóa thời trang bài bản. Chỉ trong vài năm ngắn
                  ngủi, thương hiệu đã nhanh chóng thu hút một số lượng người hâm mộ khổng lồ, bao
                  gồm cả các ngôi sao hàng đầu như Justin Bieber, Kanye West hay Kendall Jenner.
                  Phong cách đặc trưng của FOG là “grunge” (style ăn mặc thể hiện sự thoải mái,
                  phóng khoáng đi kèm một chút luộm thuộm) bằng cách pha trộn tinh thần rock’n’roll
                  và màu sắc tôn giáo một cách khéo léo trên những trang phục cơ bản của mình. Cách
                  layering item mới mẻ và những chiếc áo oversize cực chất đã tạo ra một xu hướng
                  mới trong làng thời trang đương đại. Kể từ khi xuất hiện vào năm 2013, Fear Of God
                  đã nhanh chóng trở thành biểu tượng của những người yêu thích sự trẻ trung, năng
                  động nhưng vẫn mang cái “chất” chứng tỏ bản ngã tuổi trẻ của mình.
                </p>
              </div>
            </div>
            <Row>
              <Col xs="12">
                <ul className="product-filter-tags"></ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div className="filter-main-btn" onClick={() => openSidebar()}>
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i> Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {listProduct ? `Showing Products 1-${listProduct.length}` : "loading"}{" "}
                          Result
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
                        style={layout === "list-view" ? { opacity: 0 } : { opacity: 1 }}
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select onChange={(e) => {
                          setLimit(parseInt(e.target.value))
                          setPage(1)
                          handleCallApi(e.target.value,1,0,0)
                        }}>
                          <option value="8">8 Products Par Page</option>
                          <option value="10">10 Products Par Page</option>
                          <option value="15">15 Products Par Page</option>
                          <option value="20">20 Products Par Page</option>
                        </select>
                      </div>
                      <div className="product-page-filter">
                        <select onChange={(e) => setSortBy(e.target.value)}>
                          <option value="AscOrder">Sorting items</option>
                          <option value="HighToLow">High To Low</option>
                          <option value="LowToHigh">Low To High</option>
                          <option value="Newest">Newest</option>
                          <option value="AscOrder">Asc Order</option>
                          <option value="DescOrder">Desc Order</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {!listProduct || !listProduct || listProduct.length === 0 ? (
                    listProduct && listProduct && listProduct.length === 0 ? (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Your Cart is Empty</strong>
                            </h3>
                            <h4>Explore more shortlist some items.</h4>
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
                    listProduct &&
                    listProduct.map((product, i) => (
                      <div className={grid} key={i}>
                        <div className="product">
                          <div>
                            <ProductItem2
                              des={true}
                              product={product}
                              cartClass="cart-info cart-wrap"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>
              <div className="section-t-space">
                <div className="text-center">
                  <Row>
                    <Col xl="12" md="12" sm="12">
                      {listProduct && listProduct && (
                        <Button onClick={() => handlePagination()}>
                          {isLoading && <Spinner animation="border" variant="light" />}
                          Xem thêm
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
              </Row>
            </Container>
          </div>
        </section>
      </CommonLayout>
    </>
  );
};

VenderProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default VenderProfile;

export async function getServerSideProps(context) {
  const { username } = context.query;

  // const page = 1;
  const limit = 8;
  const respone = await fetch(`${process.env.API_URL}/vendors/${username}?limit=${limit}&page=1&maxPrice=10000000&minPrice=0`);
  const { data, status, message } = await respone.json();
  if (status != 200)
    return {
      notFound: true,
    };

  return {
    props: {
      vendorProfile: data.vendorProfile,
      products: data.products,
      newProducts: data.newProducts,
      username: username,
    },
  };
}
