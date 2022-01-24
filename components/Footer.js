import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link'

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Collapse,
} from 'reactstrap'

import logo from '../assets/images/logo-color.svg'
import Copyright from './common/copyright.js'

export default function Footer({ }) {
  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth < 750);
    const changeCollapse = () => {
      setWidth(window.innerWidth < 750);
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener('resize', changeCollapse)
    }

  }, []);

  return (
    <div>
      <footer className="footer-light">
        <div className="light-layout upper-footer">
          <Container fluid="">
            <section className="small-section border-section border-top-0">
              <Row>
                <Col lg="6">
                  <div className="subscribe">
                    <div>
                      <h4>KHUYẾN MÃI, ƯU ĐÃI TRÀN NGẬP</h4>
                      <p>
                        Đăng ký để nhận thông tin các chương trình khuyến mãi của Mubaha.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <Form className="form-inline subscribe-form">
                    <FormGroup className="mx-sm-3">
                      <Input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Nhập email của bạn"
                      />
                    </FormGroup>
                    <Button type="submit" className="btn btn-solid">
                      Đăng ký
                    </Button>
                  </Form>
                </Col>
              </Row>
            </section>
          </Container>
        </div>

        <section className="section-b-space light-layout">
          <Container fluid="">
            <Row className="footer-theme partition-f">
              <Col lg="4" md="6">
                <div
                  className={`footer-title ${isOpen && collapse == 1 ? "active" : ""
                    } footer-mobile-title`}
                >
                  <h4
                    onClick={() => {
                      setCollapse(1);
                      setIsOpen(!isOpen);
                    }}
                  >
                    about
                    <span className="according-menu"></span>
                  </h4>
                </div>
                <Collapse
                  isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                >
                  <div className="footer-contant">
                    <div className="footer-logo">
                      <Link href="/">
                        <a>
                          <div style={{ width: '200px', maxWidth: '200px' }}>
                            <Image src={logo} alt="Mubaha" layout="responsive" />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <p>
                      Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín, hàng nghìn loại mặt hàng từ Điện thoại smartphone tới Rau củ quả tươi, kèm theo dịch vụ giao hàng siêu tốc Muhaba mang đến cho bạn một trải nghiệm mua sắm online bắt đầu bằng chữ tín.
                      Thêm vào đó, ở Mubaha bạn có thể dễ dàng sử dụng vô vàn các tiện ích khác như mua thẻ cào, thanh toán hoá đơn điện nước, các dịch vụ bảo hiểm.
                    </p>
                    <div className="footer-social">
                      <ul>
                        <li>
                          <a href="https://www.facebook.com">
                            <i
                              className="fa fa-facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://plus.google.com">
                            <i
                              className="fa fa-google-plus"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com">
                            <i
                              className="fa fa-instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://rss.com">
                            <i className="fa fa-rss" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </Col>
              <Col className="offset-xl-1">
                <div className="sub-title">
                  <div
                    className={`footer-title ${isOpen && collapse == 2 ? "active" : ""
                      } `}
                  >
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(2);
                        } else setIsOpen(true);
                      }}
                    >
                      my account
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 2 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul>
                        <li>
                          <Link href={`/shop/left_sidebar`}>
                            <a>womens</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/shop/left_sidebar`}>
                            <a> clothing </a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/shop/left_sidebar`}>
                            <a>accessories</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/shop/left_sidebar`}>
                            <a> featured </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${isOpen && collapse == 3 ? "active" : ""
                      } `}
                  >
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(3);
                        } else setIsOpen(true);
                      }}
                    >
                      why we choose
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 3 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul>
                        <li>
                          <a href="#">shipping & return</a>
                        </li>
                        <li>
                          <a href="#">secure shopping</a>
                        </li>
                        <li>
                          <a href="#">gallary</a>
                        </li>
                        <li>
                          <a href="#">affiliates</a>
                        </li>
                        <li>
                          <a href="#">contacts</a>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${isOpen && collapse == 4 ? "active" : ""
                      } `}
                  >
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(4);
                        } else setIsOpen(true);
                      }}
                    >
                      store information
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 4 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul className="contact-list">
                        <li>
                          <i className="fa fa-map-marker"></i>Multikart Demo
                          Store, Demo store India 345-659
                        </li>
                        <li>
                          <i className="fa fa-phone"></i>Call Us: 123-456-7898
                        </li>
                        <li>
                          <i className="fa fa-envelope-o"></i>Email Us:{" "}
                          <a href="#">Support@Fiot.com</a>
                        </li>
                        <li>
                          <i className="fa fa-fax"></i>Fax: 123456
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Copyright />
      </footer>
    </div>
  );
}
