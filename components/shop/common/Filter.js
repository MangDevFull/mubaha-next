import React from "react";
import { Col, Media } from "reactstrap";
import sideBanner from "../../../public/assets/images/side-banner.png";
import Slider from "react-slick";
import Category from "./category";
import Brand from "./brand";
import Color from "./color";
import Size from "./size";
import Price from "./price";
import SideProductCart from "@/components/SideProductCart";

const FilterPage = ({ sm, sidebarView, closeSidebar, newProducts }) => {
  return (
    <>
      <Col sm={sm} className="collection-filter" style={sidebarView ? { left: "0px" } : {}}>
        {/* <!-- side-bar colleps block stat --> */}
        <div className="collection-filter-block">
          {/* <!-- brand filter start --> */}
          <div className="collection-mobile-back" onClick={() => closeSidebar()}>
            <span className="filter-back">
              <i className="fa fa-angle-left" aria-hidden="true"></i> back
            </span>
          </div>
          <Category />
          <Brand />
          <Color />
          <Size />
          <Price />
        </div>
        {/* side-bar single product slider start */}
        <div className="theme-card">
          <h5 className="title-border">Sản phẩm mới</h5>
          <Slider slidesPerRow={3} className="offer-slider slide-1">
            {newProducts.map((product) => {
              return <SideProductCart key={product._id} product={product} />;
            })}
          </Slider>
        </div>
        {/* side-bar single product slider end */}
        <div className="collection-sidebar-banner">
          <a href={null}>
            <Media src={sideBanner.src} className="img-fluid blur-up lazyload" alt="" />
          </a>
        </div>
        {/* <!-- side-bar banner end here --> */}
      </Col>
    </>
  );
};

export default FilterPage;
