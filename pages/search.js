import Layout from '@/components/Layout.js'
import { Media, Container, Row, Col } from "reactstrap";
import React, { useState } from "react";
import FilterPage from "@/components/filter/Filter.js"
import ProductList from "@/components/filter/ProductList.js"
export default function FilterLayoutComponent(){
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  return(
    <div style={{backgroundColor:"rgb(245, 245, 250);"}}>
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
      </div>
  )
}
FilterLayoutComponent.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};