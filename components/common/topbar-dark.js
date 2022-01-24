import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

export default function TopBarDark({ topClass, fluid }) {

  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Sàn thương mại điện tử bán sỉ hàng đầu Việt Nam</li>
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>Hotline: 1900 9999
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-right">
            <ul className="header-dropdown">
              <li>
                <Link href="/">
                  <a>
                    Đăng ký
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>
                    Đăng nhập
                  </a>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
