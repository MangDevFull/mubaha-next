import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Container, Row, Col, Media, InputGroup, Button, Input } from "reactstrap"

import TopBarDark from "@/components/common/TopbarDark"

import logo from "../assets/images/logo-white.svg"

import NavBar from "@/components/common/Navbar"
import HeaderSettings from "./common/HeaderSettings"

import styles from "./HeaderTwo.module.css"

export default function HeaderTwo({ }) {

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = () => {
    let number =
      window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    if (number >= 300) {
      if (window.innerWidth < 576) {
        document.getElementById("sticky").classList.remove("fixed")
        document.getElementById("navbar-row").style.display = "block";
      }
      else {
        document.getElementById("sticky").classList.add("fixed")
        document.getElementById("navbar-row").style.display = "none";

      }
    } else {
      document.getElementById("sticky").classList.remove("fixed")
      document.getElementById("navbar-row").style.display = "block";

    }
  }

  return (
    <div>

      <header id="sticky" className={`sticky marketplace dark`}>
        <div className="mobile-fix-option"></div>

        <TopBarDark topClass="top-header top-header-dark2" />
        <Container>
          <Row>
            <Col>
              <div className="main-menu d-flex">
                <div className="menu-left">
                  <Link href="/">
                    <a>
                      <div className="brand-logo" style={{ width: "260px", maxWidth: "260px" }}>
                        <Image src={logo} alt="Mubaha" layout="responsive" />
                      </div>
                    </a>
                  </Link>
                </div>
                <div>
                  <form className={`${styles.form_search} d-none d-xl-block`} role="form">
                    <input id="query search-autocomplete" type="search"
                      placeholder="Tìm kiếm sản phẩm..." className="nav-search nav-search-field"
                      aria-expanded="true" />
                    <button type="submit" name="nav-submit-button" className="btn-search">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
                <div className="menu-right pull-right">
                  {/* <NavBar /> */}

                  <div>
                    <div className="icon-nav">
                      <ul>
                        {/* <li className="onhover-div mobile-search">
                          <div>
                            <Media
                              src="/assets/images/icon/search.png"
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </li> */}
                        <HeaderSettings />
                        {/* <Currency icon={settings} /> */}

                        {/* {direction === undefined ? (
                          <CartContainer layout={direction} icon={cart} />
                        ) : (
                          <Cart layout={direction} icon={cart} />
                        )} */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container id="navbar-row">

          <div className={styles.bottom_part}>
            <Row>
              <Col lg={3} className="d-none d-xl-block">
                <div className={`${styles.category_menu} h-100`}>
                  <Link href="/categories">
                  <a>
                  <h5 className={`mb-0 ${styles.txt_white}`}><strong><i className="fa fa-bars mr-2"></i>DANH MỤC SẢN PHẨM</strong></h5>
                  </a>
                  </Link>
                </div>
              </Col>
              <Col sm={12} lg={9}>
                <div className={`main-nav-center`}>
                  <NavBar />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </header>


    </div>
  )
}
