import Image from "next/image"
import Link from "next/link"
import {useEffect} from "react"
import {Container, Row, Col, Media, InputGroup, Button, Input} from "reactstrap"

import TopBarDark from "./common/topbar-dark"

import logo from "../assets/images/logo-color.svg"
import search from "../public/assets/images/icon/search.png"

export default function Header({}) {
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
      if (window.innerWidth < 576) document.getElementById("sticky").classList.remove("fixed")
      else document.getElementById("sticky").classList.add("fixed")
    } else document.getElementById("sticky").classList.remove("fixed")
  }

  return (
    <div>
      <header id="sticky" className="sticky marketplace">
        <div className="mobile-fix-option"></div>

        <TopBarDark topClass="top-header" />
        <Container>
          <Row>
            <Col>
              <div className="main-menu d-flex">
                <div className="menu-left">
                  <div className="brand-logo">
                    <div style={{width: "260px", maxWidth: "260px"}}>
                      <Link href="/">
                        <a>
                          <Image src={logo} alt="Mubaha" layout="responsive" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1" style={{maxWidth: "700px"}}>
                  <InputGroup>
                    <Input type="search" placeholder="Săn sale #MUBAHASALES" />
                    <Button>
                      <i className="fa fa-search"></i>
                    </Button>
                  </InputGroup>
                </div>
                <div className="menu-right pull-right">
                  {/*Top Navigation Bar Component*/}
                  {/* <NavBar /> */}

                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search">
                          <div>
                            <Media
                              src="/assets/images/icon/search.png"
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </li>
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
      </header>
    </div>
  )
}
