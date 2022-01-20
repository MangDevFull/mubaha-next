import logo from "../public/images/logo-white.svg";
import Image from "next/image";
import Link from "next/link";

export default function MainNavbar({}) {
  return (
    <>
      {/* header start */}
      <header
        className="header-style-5 color-style style-classic"
        id="sticky-header"
      >
        <div className="mobile-fix-option" />
        <div className="top-header top-header-theme">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="header-contact">
                  <ul>
                    <li>Chào mừng đến với MUBAHA</li>
                    <li>
                      <i className="fa fa-phone" aria-hidden="true" />
                      Liên hệ: 123 - 456 - 7890
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 text-end">
                <ul className="header-dropdown">
                  <li className="mobile-wishlist">
                    <a>
                      <i className="fa fa-heart" aria-hidden="true" />
                    </a>
                  </li>
                  <li className="onhover-dropdown mobile-account">
                    {" "}
                    <i className="fa fa-user" aria-hidden="true" />
                    Tài khoản của tôi
                    <ul className="onhover-show-div">
                      <li className="login">
                        <a>Đăng nhập</a>
                      </li>
                      <li className="register">
                        <a>Đăng kí</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="main-menu">
                <div className="menu-left">
                  <div className="navbar d-block d-xl-none">
                    <a>
                      <div className="bar-style" id="toggle-sidebar-res">
                        <i
                          className="fa fa-bars sidebar-bar"
                          aria-hidden="true"
                        />
                      </div>
                    </a>
                  </div>
                  <div
                    className="brand-logo"
                    style={{ maxWidth: "260px", width: "260px" }}
                  >
                    <Link href="/">
                      <a>
                        <Image src={logo} alt="" layout="responsive" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div>
                  <form className="form_search" role="form">
                    <input
                      id="query search-autocomplete"
                      type="search"
                      placeholder="Search any Device or Gadgets..."
                      className="nav-search nav-search-field"
                      aria-expanded="true"
                    />
                    <button
                      type="submit"
                      name="nav-submit-button"
                      className="btn-search"
                    >
                      <i className="ti-search" />
                    </button>
                  </form>
                </div>
                <div className="menu-right pull-right">
                  <nav className="text-start">
                    <div className="toggle-nav">
                      <i className="fa fa-bars sidebar-bar" />
                    </div>
                  </nav>
                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search d-xl-none d-inline-block">
                          <div>
                            <img
                              src="/assets/images/icon/search.png"
                              className="img-fluid blur-up lazyload"
                              alt=""
                            />{" "}
                            <i className="ti-search" />
                          </div>
                          <div id="search-overlay" className="search-overlay">
                            <div>
                              {" "}
                              <span className="closebtn" title="Close Overlay">
                                ×
                              </span>
                              <div className="overlay-content">
                                <div className="container">
                                  <div className="row">
                                    <div className="col-xl-12">
                                      <form>
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Search a Product"
                                          />
                                        </div>
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                        >
                                          <i className="fa fa-search" />
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="onhover-div d-sm-inline-block d-none">
                          <a>
                            <img
                              src="/assets/images/icon/rotate.png"
                              className="img-fluid blur-up lazyload"
                              title="compare"
                              alt=""
                            />
                          </a>
                        </li>
                        <li className="onhover-div mobile-setting">
                          <div>
                            <img
                              src="/assets/images/icon/setting.png"
                              className="img-fluid blur-up lazyload"
                              alt=""
                            />{" "}
                            <i className="ti-settings" />
                          </div>
                          <div className="show-div setting">
                            <h6>language</h6>
                            <ul>
                              <li>
                                <a>english</a>
                              </li>
                              <li>
                                <a>french</a>
                              </li>
                            </ul>
                            <h6>currency</h6>
                            <ul className="list-inline">
                              <li>
                                <a>euro</a>
                              </li>
                              <li>
                                <a>rupees</a>
                              </li>
                              <li>
                                <a>pound</a>
                              </li>
                              <li>
                                <a>doller</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="onhover-div mobile-cart">
                          <div>
                            <img
                              src="/assets/images/icon/cart.png"
                              className="img-fluid blur-up lazyload"
                              alt=""
                            />{" "}
                            <i className="ti-shopping-cart" />
                          </div>
                          <span className="cart_qty_cls">2</span>
                          <ul className="show-div shopping-cart">
                            <li>
                              <div className="media">
                                <a>
                                  <img
                                    alt=""
                                    className="me-3"
                                    src="/assets/images/fashion/product/1.jpg"
                                  />
                                </a>
                                <div className="media-body">
                                  <a>
                                    <h4>item name</h4>
                                  </a>
                                  <h4>
                                    <span>1 x $ 299.00</span>
                                  </h4>
                                </div>
                              </div>
                              <div className="close-circle">
                                <a>
                                  <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  />
                                </a>
                              </div>
                            </li>
                            <li>
                              <div className="media">
                                <a>
                                  <img
                                    alt=""
                                    className="me-3"
                                    src="/assets/images/fashion/product/2.jpg"
                                  />
                                </a>
                                <div className="media-body">
                                  <a>
                                    <h4>item name</h4>
                                  </a>
                                  <h4>
                                    <span>1 x $ 299.00</span>
                                  </h4>
                                </div>
                              </div>
                              <div className="close-circle">
                                <a>
                                  <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  />
                                </a>
                              </div>
                            </li>
                            <li>
                              <div className="total">
                                <h5>
                                  subtotal : <span>$299.00</span>
                                </h5>
                              </div>
                            </li>
                            <li>
                              <div className="buttons">
                                <a className="view-cart">view cart</a>{" "}
                                <a className="checkout">checkout</a>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-part">
          <div className="container">
            <div className="row">
              <div className="col-xl-3">
                <div className="category-menu d-none d-xl-block h-100">
                  <div id="toggle-sidebar" className="toggle-sidebar">
                    <i className="fa fa-bars sidebar-bar" />
                    <h5 className="mb-0">shop by category</h5>
                  </div>
                </div>
                <div className="sidenav fixed-sidebar marketplace-sidebar">
                  <nav>
                    <div>
                      <div className="sidebar-back text-start d-xl-none d-block">
                        <i
                          className="fa fa-angle-left pe-2"
                          aria-hidden="true"
                        />{" "}
                        Back
                      </div>
                    </div>
                    <ul id="sub-menu" className="sm pixelstrap sm-vertical">
                      <li>
                        {" "}
                        <a>TV &amp; Audio</a>
                        <ul className="mega-menu clothing-menu">
                          <li>
                            <div className="row m-0">
                              <div className="col-xl-4">
                                <div className="link-section">
                                  <h5>women's fashion</h5>
                                  <ul>
                                    <li>
                                      <a>dresses</a>
                                    </li>
                                    <li>
                                      <a>skirts</a>
                                    </li>
                                    <li>
                                      <a>westarn wear</a>
                                    </li>
                                    <li>
                                      <a>ethic wear</a>
                                    </li>
                                    <li>
                                      <a>sport wear</a>
                                    </li>
                                  </ul>
                                  <h5>men's fashion</h5>
                                  <ul>
                                    <li>
                                      <a>sports wear</a>
                                    </li>
                                    <li>
                                      <a>western wear</a>
                                    </li>
                                    <li>
                                      <a>ethic wear</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="link-section">
                                  <h5>accessories</h5>
                                  <ul>
                                    <li>
                                      <a>fashion jewellery</a>
                                    </li>
                                    <li>
                                      <a>caps and hats</a>
                                    </li>
                                    <li>
                                      <a>precious jewellery</a>
                                    </li>
                                    <li>
                                      <a>necklaces</a>
                                    </li>
                                    <li>
                                      <a>earrings</a>
                                    </li>
                                    <li>
                                      <a>wrist wear</a>
                                    </li>
                                    <li>
                                      <a>ties</a>
                                    </li>
                                    <li>
                                      <a>cufflinks</a>
                                    </li>
                                    <li>
                                      <a>pockets squares</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <a className="mega-menu-banner">
                                  <img
                                    src="/assets/images/mega-menu/fashion.jpg"
                                    alt=""
                                    className="img-fluid blur-up lazyload"
                                  />
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        {" "}
                        <a>air conditioners</a>
                        <ul>
                          <li>
                            <a>makeup</a>
                          </li>
                          <li>
                            <a>skincare</a>
                          </li>
                          <li>
                            <a>premium beaty</a>
                          </li>
                          <li>
                            {" "}
                            <a>more</a>
                            <ul>
                              <li>
                                <a>fragrances</a>
                              </li>
                              <li>
                                <a>luxury beauty</a>
                              </li>
                              <li>
                                <a>hair care</a>
                              </li>
                              <li>
                                <a>tools &amp; brushes</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        {" "}
                        <a>Refrigerators</a>
                        <ul>
                          <li>
                            <a>shopper bags</a>
                          </li>
                          <li>
                            <a>laptop bags</a>
                          </li>
                          <li>
                            <a>clutches</a>
                          </li>
                          <li>
                            {" "}
                            <a>purses</a>
                            <ul>
                              <li>
                                <a>purses</a>
                              </li>
                              <li>
                                <a>wallets</a>
                              </li>
                              <li>
                                <a>leathers</a>
                              </li>
                              <li>
                                <a>satchels</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        {" "}
                        <a>Washing Machines</a>
                        <ul>
                          <li>
                            <a>sport shoes</a>
                          </li>
                          <li>
                            <a>formal shoes</a>
                          </li>
                          <li>
                            <a>casual shoes</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>Kitchen &amp; Home</a>
                      </li>
                      <li>
                        <a>Gaming Consoles</a>
                      </li>
                      <li>
                        {" "}
                        <a>cameras</a>
                        <ul>
                          <li>
                            <a>fashion jewellery</a>
                          </li>
                          <li>
                            <a>caps and hats</a>
                          </li>
                          <li>
                            <a>precious jewellery</a>
                          </li>
                          <li>
                            {" "}
                            <a>more..</a>
                            <ul>
                              <li>
                                <a>necklaces</a>
                              </li>
                              <li>
                                <a>earrings</a>
                              </li>
                              <li>
                                <a>wrist wear</a>
                              </li>
                              <li>
                                {" "}
                                <a>accessories</a>
                                <ul>
                                  <li>
                                    <a>ties</a>
                                  </li>
                                  <li>
                                    <a>cufflinks</a>
                                  </li>
                                  <li>
                                    <a>pockets squares</a>
                                  </li>
                                  <li>
                                    <a>helmets</a>
                                  </li>
                                  <li>
                                    <a>scarves</a>
                                  </li>
                                  <li>
                                    {" "}
                                    <a>more...</a>
                                    <ul>
                                      <li>
                                        <a>accessory gift sets</a>
                                      </li>
                                      <li>
                                        <a>travel accessories</a>
                                      </li>
                                      <li>
                                        <a>phone cases</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a>belts &amp; more</a>
                              </li>
                              <li>
                                <a>wearable</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>Heating &amp; Cooling</a>
                      </li>
                      <li>
                        <a>All accessories </a>
                      </li>
                      <li>
                        <a>All Electronics </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-9">
                <div className="main-nav-center">
                  <nav className="text-start">
                    {/* Sample menu definition */}
                    <ul id="main-menu" className="sm pixelstrap sm-horizontal">
                      <li>
                        <div className="mobile-back text-end">
                          Back
                          <i
                            className="fa fa-angle-right ps-2"
                            aria-hidden="true"
                          />
                        </div>
                      </li>
                      <li>
                        <a href="index.html">Home</a>
                      </li>
                      <li className="mega" id="hover-cls">
                        <a>
                          feature <div className="lable-nav">new</div>
                        </a>
                        <ul className="mega-menu full-mega-menu">
                          <li>
                            <div className="container">
                              <div className="row">
                                <div className="col mega-box">
                                  <div className="link-section">
                                    <div className="menu-title">
                                      <h5>add to cart</h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        <li>
                                          <a href="nursery.html">
                                            cart modal popup
                                          </a>
                                        </li>
                                        <li>
                                          <a href="vegetables.html">
                                            qty. counter
                                            <i
                                              className="fa fa-bolt icon-trend"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        </li>
                                        <li>
                                          <a href="bags.html">cart top</a>
                                        </li>
                                        <li>
                                          <a href="shoes.html">cart bottom</a>
                                        </li>
                                        <li>
                                          <a href="watch.html">cart left</a>
                                        </li>
                                        <li>
                                          <a href="tools.html">cart right</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col mega-box">
                                  <div className="link-section">
                                    <div className="menu-title">
                                      <h5>model</h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        <li>
                                          <a>Newsletter</a>
                                        </li>
                                        <li>
                                          <a>
                                            exit
                                            <i
                                              className="ms-2 fa fa-bolt icon-trend"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        </li>
                                        <li>
                                          <a href="christmas.html">christmas</a>
                                        </li>
                                        <li>
                                          <a href="furniture-3.html">
                                            black friday
                                          </a>
                                        </li>
                                        <li>
                                          <a href="fashion-4.html">
                                            cyber monday
                                          </a>
                                        </li>
                                        <li>
                                          <a href="marketplace-demo-3.html">
                                            new year
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col mega-box">
                                  <div className="link-section">
                                    <div className="menu-title">
                                      <h5>cookie bar</h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        <li>
                                          <a>
                                            bottom
                                            <i
                                              className="ms-2 fa fa-bolt icon-trend"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        </li>
                                        <li>
                                          <a>bottom left</a>
                                        </li>
                                        <li>
                                          <a>bottom right</a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="menu-title mt-2">
                                      <h5>search</h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        <li>
                                          <a href="marketplace-demo-2.html">
                                            ajax search
                                            <i
                                              className="ms-2 fa fa-bolt icon-trend"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col mega-box">
                                  <div className="link-section">
                                    <div className="menu-title">
                                      <h5>invoice template</h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="invoice-1.html"
                                          >
                                            invoice 1
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="invoice-2.html"
                                          >
                                            invoice 2
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="invoice-3.html"
                                          >
                                            invoice 3
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="invoice-4.html"
                                          >
                                            invoice 4
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="invoice-5.html"
                                          >
                                            invoice 5
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col mega-box">
                                  <div className="link-section">
                                    <div className="menu-title">
                                      <h5>email template</h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="/email-template/email-order-success.html"
                                          >
                                            order success
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="/email-template/email-order-success-two.html"
                                          >
                                            order success 2
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="/email-template/email-template.html"
                                          >
                                            email template
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="/email-template/email-template-two.html"
                                          >
                                            email template 2
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="menu-title mt-2">
                                      <h5>elements</h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        <li>
                                          <a href="elements.html">
                                            elements page
                                            <i
                                              className="ms-2 fa fa-bolt icon-trend"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <img
                                    src="/assets/images/menu-banner.jpg"
                                    className="img-fluid mega-img"
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>shop</a>
                        <ul>
                          <li>
                            <a href="category-page(top-filter).html">
                              top filter<span className="new-tag">new</span>
                            </a>
                          </li>
                          <li>
                            <a href="category-page(modern).html">
                              modern<span className="new-tag">new</span>
                            </a>
                          </li>
                          <li>
                            <a href="category-page.html">left sidebar</a>
                          </li>
                          <li>
                            <a href="category-page(right).html">
                              right sidebar
                            </a>
                          </li>
                          <li>
                            <a href="category-page(no-sidebar).html">
                              no sidebar
                            </a>
                          </li>
                          <li>
                            <a href="category-page(sidebar-popup).html">
                              sidebar popup
                            </a>
                          </li>
                          <li>
                            <a href="category-page(metro).html">metro</a>
                          </li>
                          <li>
                            <a href="category-page(full-width).html">
                              full width
                            </a>
                          </li>
                          <li>
                            <a href="category-page(infinite-scroll).html">
                              infinite scroll
                            </a>
                          </li>
                          <li>
                            <a href="category-page(3-grid).html">three grid</a>
                          </li>
                          <li>
                            <a href="category-page(6-grid).html">six grid</a>
                          </li>
                          <li>
                            <a href="category-page(list-view).html">
                              list view
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>product</a>
                        <ul>
                          <li>
                            <a href="product-page(360-view).html">
                              360 view <span className="new-tag">new</span>
                            </a>
                          </li>
                          <li>
                            <a href="product-page(video-thumbnail).html">
                              video thumbnail
                              <span className="new-tag">new</span>
                            </a>
                          </li>
                          <li>
                            <a>sidebar</a>
                            <ul>
                              <li>
                                <a href="product-page.html">left sidebar</a>
                              </li>
                              <li>
                                <a href="product-page(right-sidebar).html">
                                  right sidebar
                                </a>
                              </li>
                              <li>
                                <a href="product-page(no-sidebar).html">
                                  no sidebar
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>thumbnail image</a>
                            <ul>
                              <li>
                                <a href="product-page(left-image).html">
                                  left image
                                </a>
                              </li>
                              <li>
                                <a href="product-page(right-image).html">
                                  right image
                                </a>
                              </li>
                              <li>
                                <a href="product-page(image-outside).html">
                                  image outside
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>three column</a>
                            <ul>
                              <li>
                                <a href="product-page(3-col-left).html">
                                  thumbnail left
                                </a>
                              </li>
                              <li>
                                <a href="product-page(3-col-right).html">
                                  thumbnail right
                                </a>
                              </li>
                              <li>
                                <a href="product-page(3-column).html">
                                  thubnail bottom
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="product-page(4-image).html">four image</a>
                          </li>
                          <li>
                            <a href="product-page(sticky).html">sticky</a>
                          </li>
                          <li>
                            <a href="product-page(accordian).html">accordian</a>
                          </li>
                          <li>
                            <a href="product-page(bundle).html">bundle</a>
                          </li>
                          <li>
                            <a href="product-page(image-swatch).html">
                              image swatch{" "}
                            </a>
                          </li>
                          <li>
                            <a href="product-page(vertical-tab).html">
                              vertical tab
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>pages</a>
                        <ul>
                          <li>
                            <a>vendor</a>
                            <ul>
                              <li>
                                <a href="vendor-dashboard.html">
                                  vendor dashboard
                                </a>
                              </li>
                              <li>
                                <a href="vendor-profile.html">vendor profile</a>
                              </li>
                              <li>
                                <a href="become-vendor.html">become vendor</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>account</a>
                            <ul>
                              <li>
                                <a href="wishlist.html">wishlist</a>
                              </li>
                              <li>
                                <a href="cart.html">cart</a>
                              </li>
                              <li>
                                <a href="dashboard.html">Dashboard</a>
                              </li>
                              <li>
                                <a href="login.html">login</a>
                              </li>
                              <li>
                                <a href="register.html">register</a>
                              </li>
                              <li>
                                <a href="contact.html">contact</a>
                              </li>
                              <li>
                                <a href="forget_pwd.html">forget password</a>
                              </li>
                              <li>
                                <a href="profile.html">profile</a>
                              </li>
                              <li>
                                <a href="checkout.html">checkout</a>
                              </li>
                              <li>
                                <a href="order-success.html">order success</a>
                              </li>
                              <li>
                                <a href="order-tracking.html">
                                  order tracking
                                  <span className="new-tag">new</span>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a>portfolio</a>
                            <ul>
                              <li>
                                <a>grid</a>
                                <ul>
                                  <li>
                                    <a href="grid-2-col.html">grid 2</a>
                                  </li>
                                  <li>
                                    <a href="grid-3-col.html">grid 3</a>
                                  </li>
                                  <li>
                                    <a href="grid-4-col.html">grid 4</a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a>masonry</a>
                                <ul>
                                  <li>
                                    <a href="masonary-2-grid.html">grid 2</a>
                                  </li>
                                  <li>
                                    <a href="masonary-3-grid.html">grid 3</a>
                                  </li>
                                  <li>
                                    <a href="masonary-4-grid.html">grid 4</a>
                                  </li>
                                  <li>
                                    <a href="masonary-fullwidth.html">
                                      full width
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="about-page.html">about us</a>
                          </li>
                          <li>
                            <a href="search.html">search</a>
                          </li>
                          <li>
                            <a href="review.html">review</a>
                          </li>
                          <li>
                            <a>compare</a>
                            <ul>
                              <li>
                                <a href="compare.html">compare</a>
                              </li>
                              <li>
                                <a href="compare-2.html">compare-2</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="collection.html">collection</a>
                          </li>
                          <li>
                            <a href="lookbook.html">lookbook</a>
                          </li>
                          <li>
                            <a href="sitemap.html">site map</a>
                          </li>
                          <li>
                            <a href="404.html">404</a>
                          </li>
                          <li>
                            <a href="coming-soon.html">coming soon</a>
                          </li>
                          <li>
                            <a href="faq.html">FAQ</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>blog</a>
                        <ul>
                          <li>
                            <a href="blog-page.html">left sidebar</a>
                          </li>
                          <li>
                            <a href="blog(right-sidebar).html">right sidebar</a>
                          </li>
                          <li>
                            <a href="blog(no-sidebar).html">no sidebar</a>
                          </li>
                          <li>
                            <a href="blog-details.html">blog details</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* header end */}
    </>
  );
}
