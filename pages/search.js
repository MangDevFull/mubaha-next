import Layout from '@/components/Layout.js'
import { Media, Container, Row, Col } from "reactstrap";
import React, { useState } from "react";
import FilterPage from "@/components/filter/Filter.js"
import ProductList from "@/components/filter/ProductList.js"
export default function FilterLayoutComponent({ data }) {
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  const [limit,setLimit] = useState(20)
  const [page,setPage] = useState(1)
  const [priceRange,setPriceRange] = useState({priceMax:1000000,priceMin:0})
  const [brand,setBrand] = useState()
  const [cateID,setCateID] = useState()
  const [location,setLocation] = useState()
  return (
    <div style={{ backgroundColor: "rgb(245, 245, 250);" }}>
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <FilterPage
                limit={limit} page = {page} 
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
export async function getServerSideProps(ctx) {
  const { limit, page, priceMax, priceMin, location, brand, text, cateID } = ctx.query
  const searchQuery = `limit=${limit || 20}&page=${page || 1}&priceMax=${priceMax || 10000000}&priceMin=${priceMin || 0}`

  if (location) {
    searchQuery += `&location=${location}`
  }
  if (brand) {
    searchQuery += `&brand=${brand}`
  }
  if (text) {
    searchQuery += `&text=${text}`
  }
  if (cateID) {
    searchQuery += `&cateID=${cateID}`
  }

  const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`)
  const data = await res.json()

    return { props: { data } }
  
}