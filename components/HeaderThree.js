import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Container, Row, Col, Media } from "reactstrap"

import TopBarDark from "@/components/common/TopbarDark"

import logo from "../assets/images/logo-white.svg"

import HeaderSettings from "./common/HeaderSettings"

import styles from "./HeaderTwo.module.css"

import SearchOverlay from "@/components/common/SearchOverlay";

export default function HeaderThree(){

  const [toggleSearch, setToggleSearch] = useState(false)
  const [navClose, setNavClose] = useState({ right: "0px" });

  const openNav = () => {
    setNavClose({ right: "0px" });
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
  };


  const openSearch = () => {
    setToggleSearch(true);
  };
 return(
  <>
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
                    <div className="brand-logo" style={{ width: "15vw", maxWidth: "15vw" }}>
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
                <nav className="text-start">
                  <div className="toggle-nav" onClick={openNav.bind(this)}><i className="fa fa-bars sidebar-bar"></i></div>
                </nav>

                <div>
                  <div className="icon-nav">
                    <ul>
                      <li className="onhover-div mobile-search d-xl-none d-inline-block">
                        <div>
                          <Media
                            src="/assets/images/icon/search.png"
                            className="img-fluid"
                            onClick={openSearch}
                            alt=""
                          />
                        </div>
                      </li>
                      <HeaderSettings />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
    <SearchOverlay toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
</>
 )
}