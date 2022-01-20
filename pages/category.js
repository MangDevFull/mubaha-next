import Slider from "react-slick";
import Img from "next/image";
import SideProductCart from "../components/SideProductCart";
import data from "./products.json";

export default function Category() {
  const products = data.products.splice(0, 20);
  return (
    <>
      <div className="vendor-cover">
        <div
          className="bg-size blur-up lazyloaded"
          style={{
            backgroundImage:
              'url("https://mubaha.hn.ss.bfcplatform.vn/data/store.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center center",
            display: "block",
          }}
        ></div>
      </div>

      <section className="vendor-profile pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile-left">
                <div className="profile-image">
                  <div>
                    <img
                      src="https://mubaha.hn.ss.bfcplatform.vn/data/118230377_109738244185899_5156288428963243418_n.jpeg"
                      alt=""
                      className="img-fluid"
                    />
                    <h3>Lamia Store</h3>
                    <div className="rating">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                    </div>
                    <h6>750 Followers | 10 Review</h6>
                  </div>
                </div>
                <div className="profile-detail">
                  <div>
                    <p>
                      Lamia thay lời muốn nói của các cô nàng bằng bản tuyên
                      ngôn thời trang nữ quyền cá tính. Thấu hiểu được vai trò
                      của người phụ nữ trong xã hội hiện đại.{" "}
                    </p>
                  </div>
                </div>
                <div className="vendor-contact">
                  <div>
                    <h6>follow us:</h6>
                    <div className="footer-social">
                      <ul>
                        <li>
                          <a href="https://www.facebook.com/mia.la.1257">
                            <i className="fa fa-facebook" aria-hidden="true" />
                          </a>
                        </li>
                        <li>
                          <a href="mubaha.fashion@gmail.com">
                            <i
                              className="fa fa-google-plus"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.tiktok.com/tag/lamia?lang=vi-VN">
                            <i className="fa fa-twitter" aria-hidden="true" />
                          </a>
                        </li>
                        <li>
                          <a>
                            <i
                              className="https://www.instagram.com/accounts/login/"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h6>If You Have Any Query:</h6>
                    <a className="btn btn-solid btn-sm">Contact Seller</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category*/}
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-3 collection-filter">
                {/* side-bar colleps block stat */}
                <div className="collection-filter-block">
                  {/* brand filter start */}
                  <div className="collection-mobile-back">
                    <span className="filter-back">
                      <i className="fa fa-angle-left" aria-hidden="true" /> back
                    </span>
                  </div>
                  <div className="collection-collapse-block">
                    <h3 className="collapse-block-title">brand</h3>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="zara"
                          />
                          <label className="form-check-label" htmlFor="zara">
                            zara
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="vera-moda"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="vera-moda"
                          >
                            vera-moda
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="forever-21"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="forever-21"
                          >
                            forever-21
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="roadster"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="roadster"
                          >
                            roadster
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="only"
                          />
                          <label className="form-check-label" htmlFor="only">
                            only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* color filter start here */}
                  <div className="collection-collapse-block open">
                    <h3 className="collapse-block-title">colors</h3>
                    <div className="collection-collapse-block-content">
                      <div className="color-selector">
                        <ul>
                          <li className="color-1 active" />
                          <li className="color-2" />
                          <li className="color-3" />
                          <li className="color-4" />
                          <li className="color-5" />
                          <li className="color-6" />
                          <li className="color-7" />
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* size filter start here */}
                  <div className="collection-collapse-block border-0 open">
                    <h3 className="collapse-block-title">size</h3>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="hundred"
                          />
                          <label className="form-check-label" htmlFor="hundred">
                            s
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="twohundred"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="twohundred"
                          >
                            m
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="threehundred"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="threehundred"
                          >
                            l
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="fourhundred"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="fourhundred"
                          >
                            xl
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* price filter start here */}
                  <div className="collection-collapse-block border-0 open">
                    <h3 className="collapse-block-title">price</h3>
                    <div className="collection-collapse-block-content">
                      <div className="wrapper mt-3">
                        <div className="range-slider">
                          <span className="irs js-irs-0">
                            <span className="irs">
                              <span className="irs-line" tabIndex={-1}>
                                <span className="irs-line-left" />
                                <span className="irs-line-mid" />
                                <span className="irs-line-right" />
                              </span>
                              <span
                                className="irs-min"
                                style={{ visibility: "hidden" }}
                              >
                                $0
                              </span>
                              <span
                                className="irs-max"
                                style={{ visibility: "hidden" }}
                              >
                                $1.500
                              </span>
                              <span
                                className="irs-from"
                                style={{ visibility: "visible", left: "0%" }}
                              >
                                $0
                              </span>
                              <span
                                className="irs-to"
                                style={{
                                  visibility: "visible",
                                  left: "84.0909%",
                                }}
                              >
                                $1.500
                              </span>
                              <span
                                className="irs-single"
                                style={{
                                  visibility: "hidden",
                                  left: "36.7424%",
                                }}
                              >
                                $0 - $1.500
                              </span>
                            </span>
                            <span className="irs-grid" />
                            <span
                              className="irs-bar"
                              style={{ left: "1.51515%", width: "96.9697%" }}
                            />
                            <span
                              className="irs-shadow shadow-from"
                              style={{ display: "none" }}
                            />
                            <span
                              className="irs-shadow shadow-to"
                              style={{ display: "none" }}
                            />
                            <span
                              className="irs-slider from"
                              style={{ left: "0%" }}
                            />
                            <span
                              className="irs-slider to"
                              style={{ left: "96.9697%" }}
                            />
                          </span>
                          <input
                            type="text"
                            className="js-range-slider irs-hidden-input"
                            defaultValue
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* silde-bar colleps block end here */}

                {/* side-bar single product slider start */}
                <div className="theme-card">
                  <h5 className="title-border">new product</h5>
                  <Slider slidesPerRow={3} className="offer-slider slide-1">
                    {products.map((product) => (
                      <SideProductCart key={product.id} product={product} />
                    ))}
                  </Slider>
                </div>

                {/* side-bar single product slider end */}

                {/* side-bar banner start here */}
                <div className="collection-sidebar-banner">
                  <a>
                    <img
                      src="../assets/images/side-banner.png"
                      className="img-fluid blur-up lazyloaded"
                      alt=""
                    />
                  </a>
                </div>
                {/* side-bar banner end here */}
              </div>
              <div className="collection-content col">
                <div className="page-main-content">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="top-banner-wrapper">
                        <a>
                          <img
                            src="../assets/images/mega-menu/2.jpg"
                            className="img-fluid blur-up lazyloaded"
                            alt=""
                          />
                        </a>
                        <div className="top-banner-content small-section">
                          <h4>BIGGEST DEALS ON TOP BRANDS</h4>
                          <p>
                            The trick to choosing the best wear for yourself is
                            to keep in mind your body type, individual style,
                            occasion and also the time of day or weather. In
                            addition to eye-catching products from top brands,
                            we also offer an easy 30-day return and exchange
                            policy, free and fast shipping across all pin codes,
                            cash or card on delivery option, deals and
                            discounts, among other perks. So, sign up now and
                            shop for westarn wear to your heart’s content on
                            MUBAHA.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="collection-product-wrapper">
                        <div className="product-top-filter">
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="filter-main-btn">
                                <span className="filter-btn btn btn-theme">
                                  <i
                                    className="fa fa-filter"
                                    aria-hidden="true"
                                  />{" "}
                                  Filter
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="product-filter-content">
                                <div className="search-count">
                                  <h5>Showing Products 1-24 of 10 Result</h5>
                                </div>
                                <div className="collection-view">
                                  <ul>
                                    <li>
                                      <i className="fa fa-th grid-layout-view" />
                                    </li>
                                    <li>
                                      <i className="fa fa-list-ul list-layout-view" />
                                    </li>
                                  </ul>
                                </div>
                                <div className="collection-grid-view">
                                  <ul>
                                    <li>
                                      <img
                                        src="../assets/images/icon/2.png"
                                        alt=""
                                        className="product-2-layout-view"
                                      />
                                    </li>
                                    <li>
                                      <img
                                        src="../assets/images/icon/3.png"
                                        alt=""
                                        className="product-3-layout-view"
                                      />
                                    </li>
                                    <li>
                                      <img
                                        src="../assets/images/icon/4.png"
                                        alt=""
                                        className="product-4-layout-view"
                                      />
                                    </li>
                                    <li>
                                      <img
                                        src="../assets/images/icon/6.png"
                                        alt=""
                                        className="product-6-layout-view"
                                      />
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-page-per-view">
                                  <select>
                                    <option value="High to low">
                                      24 Products Par Page
                                    </option>
                                    <option value="Low to High">
                                      50 Products Par Page
                                    </option>
                                    <option value="Low to High">
                                      100 Products Par Page
                                    </option>
                                  </select>
                                </div>
                                <div className="product-page-filter">
                                  <select>
                                    <option value="High to low">
                                      Sorting items
                                    </option>
                                    <option value="Low to High">
                                      50 Products
                                    </option>
                                    <option value="Low to High">
                                      100 Products
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-wrapper-grid">
                          <div className="row margin-res">
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/35.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/35.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/36.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/36.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div>
                                    <div className="rating">
                                      <i className="fa fa-star" />{" "}
                                      <i className="fa fa-star" />{" "}
                                      <i className="fa fa-star" />{" "}
                                      <i className="fa fa-star" />{" "}
                                      <i className="fa fa-star" />
                                    </div>
                                    <a>
                                      <h6>Slim Fit Cotton Shirt</h6>
                                    </a>
                                    <p>
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy text ever since the 1500s, when an
                                      unknown printer took a galley of type and
                                      scrambled it to make a type specimen book
                                    </p>
                                    <h4>$500.00</h4>
                                    <ul className="color-variant">
                                      <li className="bg-light0" />
                                      <li className="bg-light1" />
                                      <li className="bg-light2" />
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/27.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/27.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/28.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/28.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/1.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/1.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/2.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/2.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/33.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/33.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/34.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/34.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/27.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/27.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/28.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/28.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/35.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/35.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/36.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/36.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/27.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/27.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/28.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/28.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/1.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/1.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/2.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/2.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/27.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/27.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/28.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/28.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/1.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/1.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/2.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/2.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/33.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/33.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/34.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/34.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-6 col-grid-box">
                              <div className="product-box">
                                <div className="img-wrapper">
                                  <div className="front">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/1.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/1.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="back">
                                    <a
                                      className="bg-size blur-up lazyloaded"
                                      style={{
                                        backgroundImage:
                                          'url("../assets/images/pro3/2.jpg")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        display: "block",
                                      }}
                                    >
                                      <img
                                        src="../assets/images/pro3/2.jpg"
                                        className="img-fluid blur-up lazyload bg-img"
                                        alt=""
                                        style={{ display: "none" }}
                                      />
                                    </a>
                                  </div>
                                  <div className="cart-info cart-wrap">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#addtocart"
                                      title="Add to cart"
                                    >
                                      <i className="ti-shopping-cart" />
                                    </button>{" "}
                                    <a title="Add to Wishlist">
                                      <i
                                        className="ti-heart"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick-view"
                                      title="Quick View"
                                    >
                                      <i
                                        className="ti-search"
                                        aria-hidden="true"
                                      />
                                    </a>{" "}
                                    <a>
                                      <i
                                        className="ti-reload"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="product-detail">
                                  <div className="rating">
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />{" "}
                                    <i className="fa fa-star" />
                                  </div>
                                  <a>
                                    <h6>Slim Fit Cotton Shirt</h6>
                                  </a>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book
                                  </p>
                                  <h4>$500.00</h4>
                                  <ul className="color-variant">
                                    <li className="bg-light0" />
                                    <li className="bg-light1" />
                                    <li className="bg-light2" />
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-pagination">
                          <div className="theme-paggination-block">
                            <div className="row">
                              <div className="col-xl-6 col-md-6 col-sm-12">
                                <nav aria-label="Page navigation">
                                  <ul className="pagination">
                                    <li className="page-item">
                                      <a
                                        className="page-link"
                                        aria-label="Previous"
                                      >
                                        <span aria-hidden="true">
                                          <i
                                            className="fa fa-chevron-left"
                                            aria-hidden="true"
                                          />
                                        </span>{" "}
                                        <span className="sr-only">
                                          Previous
                                        </span>
                                      </a>
                                    </li>
                                    <li className="page-item active">
                                      <a className="page-link">1</a>
                                    </li>
                                    <li className="page-item">
                                      <a className="page-link">2</a>
                                    </li>
                                    <li className="page-item">
                                      <a className="page-link">3</a>
                                    </li>
                                    <li className="page-item">
                                      <a
                                        className="page-link"
                                        aria-label="Next"
                                      >
                                        <span aria-hidden="true">
                                          <i
                                            className="fa fa-chevron-right"
                                            aria-hidden="true"
                                          />
                                        </span>{" "}
                                        <span className="sr-only">Next</span>
                                      </a>
                                    </li>
                                  </ul>
                                </nav>
                              </div>
                              <div className="col-xl-6 col-md-6 col-sm-12">
                                <div className="product-search-count-bottom">
                                  <h5>Showing Products 1-24 of 10 Result</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Category end */}
    </>
  );
}
