import React, { useState } from "react";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import StarRatings from "react-star-ratings";

const ProductTab = ({ detailProduct }) => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <section className="tab-product m-0">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => setActiveTab("1")}
                  >
                    Mô tả
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => setActiveTab("2")}
                  >
                    Chi tiết
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => setActiveTab("3")}
                  >
                    Video
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "4" ? "active" : ""}
                    onClick={() => setActiveTab("4")}
                  >
                    Đánh giá
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material">
                <TabPane tabId="1">
                  <p className="mb-0 pb-0">{detailProduct.shortDescription}</p>
                </TabPane>
                <TabPane tabId="2">
                  <p className="mb-0 pb-0">{detailProduct.description}</p>
                </TabPane>
                <TabPane tabId="3">
                  <p className="mb-0 pb-0">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/PsSq48UFPMs"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </p>
                </TabPane>
                <TabPane tabId="4">
                  {detailProduct.reviews.map((review) => {
                    return (
                      <div key={review._id}>
                        <h3 className="mt-3">{review.reviewer.profile.fullName}</h3>
                        <div className="rating-section">
                          <div className="rating">
                            <StarRatings rating={review.rating} starDimension="18px" starSpacing="1px" starRatedColor="orange"/>
                          </div>
                        </div>
                        <p className="p-0">{review.content}</p>
                      </div>
                    );
                  })}
                </TabPane>
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductTab;
