import Layout from '@/components/Layout.js'
import { Media, Container, Row, Col } from "reactstrap";
import React, { useState, useLayoutEffect } from "react";
import FilterPage from "@/components/filter/Filter.js"
import ProductList from "@/components/filter/ProductList.js"
import _ from 'lodash'
import {useRouter} from 'next/router'
export default function FilterLayoutComponent({ data }) {
  const router = useRouter();
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  const [limit, setLimit] = useState(data.produtcs.limit)
  const [products, setProduct] = useState(data.produtcs.docs)
  const [cuurentPage, setCurrentPage] = useState(data.produtcs.page)
  const [totalPages, setTotalPages] = useState(data.produtcs.totalPages)
  const [totalProduct, setTotalProduct] = useState(data.produtcs.totalDocs)
  const [hasNextPage, setHasNextPage] = useState(data.produtcs.hasNextPage)
  const [text, setText] = useState(data.text)
  const [brand, setBrand] = useState(data.brand)
  const [cateID, setCateID] = useState(data.cateID)
  const [priceMin, setPriceMin] = useState(data.priceMin)
  const [priceMax, setPriceMax] = useState(data.priceMax)
  const [location, setLocation] = useState(data.location)

  const handleLimit = (limit) => {
    setLimit(limit)
  }
  useLayoutEffect(() => {
    handleApi()
  }, [limit,brand,location,priceMin,priceMax])
  const hanldeBrand = (brand) => {
    console.log('brand', brand)
    setBrand(brand)
  }
  const handleLocation = (e) => {
    const isCheck = e.target.checked
    const value = e.target.value
    let list = []
    if(isCheck) {
         list = _.concat(location,value)
    }else{
      list = _.pull(location,value)
    }
    setLocation([...list])
  }
  const handlePaging = async () => {
    console.log('aa')
    const page = cuurentPage + 1
    setCurrentPage(page)
    try {
      let searchQuery = `limit=${limit}&page=${page}`
      if (location.length >0) {
        searchQuery += `&location=${location}`
      }
      if (brand.length >0) {
        searchQuery += `&brand=${brand}`
      }
      if (text !== "") {
        searchQuery += `&text=${text}`
      }
      if (cateID.length>0) {
        searchQuery += `&cateID=${cateID}`
      }
      if (typeof priceMax === "number") {
        searchQuery += `&priceMax=${priceMax}`
      }
      if (typeof priceMin === "number") {
        searchQuery += `&priceMin=${priceMin}`
      }
      const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`)
      const data = await res.json()
      if (data.status === 200) {
        const list = _.concat(products,data.data.docs)
        setTimeout(() =>{
          setProduct([...list])
          setCurrentPage(data.data.page)
          setTotalPages(data.data.totalPages)
          setTotalProduct(data.data.totalDocs)
          setHasNextPage(data.data.hasNextPage)
        },1500)
        
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  const handleApi = async () => {
    try {
      let searchQuery = `limit=${limit}&page=${cuurentPage}`
      if (location.length >0) {
        searchQuery += `&location=${location}`
      }
      if (brand.length >0) {
        searchQuery += `&brand=${brand}`
      }
      if (text !== "") {
        searchQuery += `&text=${text}`
      }
      if (cateID.length>0) {
        searchQuery += `&cateID=${cateID}`
      }
      if (typeof priceMax === "number") {
        searchQuery += `&priceMax=${priceMax}`
      }
      if (typeof priceMin === "number") {
        searchQuery += `&priceMin=${priceMin}`
      }
      const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`)
      const data = await res.json()
      if (data.status === 200) {
          setProduct([...data.data.docs])
          setCurrentPage(data.data.page)
          setTotalPages(data.data.totalPages)
          setTotalProduct(data.data.totalDocs)
          setHasNextPage(data.data.hasNextPage)
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  return (
    <div style={{ backgroundColor: "rgb(245, 245, 250);" }}>
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <FilterPage
                sm="3"
                sidebarView={sidebarView} hanldeBrand={hanldeBrand} handleLocation={handleLocation}
                closeSidebar={() => openCloseSidebar(sidebarView)}
              />
              <ProductList
                limit={limit} totalProduct={totalProduct} hasNextPage={hasNextPage} totalPages={totalPages}
                handlePaging={handlePaging}
                cateID ={cateID} brand={brand} priceMin={priceMin} priceMax={priceMax} location={location} text={text}
                products={products} cuurentPage={cuurentPage}
                handleLimit={handleLimit}
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
  let searchQuery = `limit=${limit || 20}&page=${page || 1}`

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
  if (priceMax) {
    searchQuery += `&priceMax=${priceMax}`
  }
  if (priceMin) {
    searchQuery += `&priceMin=${priceMin}`
  }

  const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`)
  const data = await res.json()

  return { props: { data: { produtcs: data.data, priceMax: priceMax || "", priceMin: priceMin || "", location: location || [], brand: brand || [], text: text || "", cateID: cateID || [] } } }

}