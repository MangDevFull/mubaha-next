import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

import {useSession, signOut} from 'next-auth/react'

export default function TopBarDark({ topClass, fluid }) {

  const { data: session, status } = useSession()

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
              {!session ?
              <>
              <li>
              <Link href="/auth/register">
                <a>
                  Đăng ký
                </a>
              </Link>
            </li>
            <li>
              <Link href="/auth/login">
                <a>
                  Đăng nhập
                </a>
              </Link>
            </li>
            </> : <>
            <li>
                <Link href="/">
                  <a>
                    Thông tin tài khoản
                  </a>
                </Link>
              </li>
              <li>
                  <a onClick={signOut}>
                    Đăng xuất
                  </a>
              </li></>
              }
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
