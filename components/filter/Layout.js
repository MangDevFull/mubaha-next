import { Media, Container, Row, Col } from "reactstrap";
import Footer from '@/components/Footer.js'
import HeaderTwo from '@components/HeaderTwo.js';
import React, { useState } from "react";
import FilterPage from "@/components/filter/Filter.js"
import ProductList from "@/components/filter/ProductList.js"
export default function FilterLayoutComponent({children}){
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  return (
    <>
  <HeaderTwo />
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <FilterPage
                sm="3"
                sidebarView={sidebarView}
                closeSidebar={() => openCloseSidebar(sidebarView)}
              />
              <ProductList
                colClass="col-xl-3 col-md-6 col-grid-box"
                openSidebar={() => openCloseSidebar(sidebarView)}
              />
            </Row>
          </Container>
        </div>
      </section>
      <Footer />
    </>
  );
}