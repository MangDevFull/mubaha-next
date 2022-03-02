import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row } from "reactstrap";
import styles from "./Navbar.module.css"

export default function NavBar() {
  const [navClose, setNavClose] = useState({ right: "0px" });

  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  const openNav = () => {
    setNavClose({ right: "0px" });
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
  };

  return (
    
    <div>
      <div className="main-navbar">
        <div id="mainnav">
          <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div>
          <ul className="nav-menu sm pixelstrap sm-horizontal" style={navClose}>
            <li className="back-btn" onClick={closeNav.bind(this)}>
              <div className="mobile-back text-right">
                <span>Quay lại</span>
                <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
              </div>
            </li>
            <li>
              <a href="#" className="nav-link">Việt Nam</a>
            </li>
            <li>
              <div className="lable-nav">hot</div>
              <a href="#" className="nav-link">Trung Quốc</a>
            </li>
            <li>
              <a href="#" className="nav-link">Hàn Quốc</a>
            </li>
            <li>
              <a href="#" className="nav-link">Âu Mỹ</a>
            </li>
            {/* <li>
              <a href="#" className="nav-link">
                Thương Hiệu
                <span className="sub-arrow"></span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
