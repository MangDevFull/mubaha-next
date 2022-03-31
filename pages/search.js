import Layout from '@/components/Layout.js'
import { Media, Container, Row, Col } from "reactstrap";
import React, { useState, useLayoutEffect } from "react";
import FilterPage from "@/components/filter/Filter.js"
import ProductList from "@/components/filter/ProductList.js"
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function FilterLayoutComponent({ data }) {
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
  const [text, setText] = useState(data.t)
  const [brand, setBrand] = useState(data.brands)
  const [cat, setCateID] = useState(data.cat)
  const [priceMin, setPriceMin] = useState(data.minPrice)
  const [priceMax, setPriceMax] = useState(data.maxPrice)
  const [location, setLocation] = useState(data.location)
  const [rating,setRating] = useState(data.rating)
  const handleLimit = (limit) => {
    setLimit(limit)
  }
  useLayoutEffect(() => {
    handleApi()
  }, [limit,brand,location,rating,cat,text,priceMin,priceMax])
  const hanldeBrand = (e) => {
    const isCheck = e.target.checked
    const value = e.target.value
    if(isCheck) {
      if(brand === ""){
          setBrand(value)
      }else{
        const prev = `${brand},${value}`
        setBrand(prev)
      }
    }else{
      const list =  _.split(brand,',')
      const rs = _.pull(list,value)
      setBrand(rs.toString())
    }
  }
  const handleLocation = (e) => {
    const isCheck = e.target.checked
    const value = e.target.value
    if(isCheck) {
      if(location === ""){
          setLocation(value)
      }else{
        const prev = `${location},${value}`
        setLocation(prev)
      }
    }else{
      const list =  _.split(location,',')
      const rs = _.pull(list,value)
      setLocation(rs.toString())
    }
  }
  const hanldePrice = (min,max) =>{
      setPriceMax(max)
      setPriceMin(min)
  }
  const handlePaging = async () => {
    const page = cuurentPage + 1
    setCurrentPage(page)
    try {
      let searchQuery = `limit=${limit}&page=${page}`
      if (location !== "") {
        searchQuery += `&location=${location}`
      }
      if (brand !== "") {
        searchQuery += `&brands=${brand}`
      }
      if (text !== "") {
        searchQuery += `&t=${text}`
      }
      if (cat !== "") {
        searchQuery += `&cat=${cat}`
      }
      if (typeof priceMax === "number") {
        searchQuery += `&maxPrice=${priceMax}`
      }
      if (typeof priceMin === "number") {
        searchQuery += `&minPrice=${priceMin}`
      }
      if(rating >0){
        searchQuery += `&rating=${rating}`
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
      if (location !== "") {
        searchQuery += `&location=${location}`
      }
      if (brand !== "") {
        searchQuery += `&brands=${brand}`
      }
      if (text !== "") {
        searchQuery += `&text=${text}`
      }
      if (cat !== "") {
        searchQuery += `&cat=${cat}`
      }
      if (priceMax !== "") {
        searchQuery += `&maxPrice=${priceMax}`
      }
      if (priceMin !== "") {
        searchQuery += `&minPrice=${priceMin}`
      }
      if(rating >0){
        searchQuery += `&rating=${rating}`
      }
      console.log(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`)
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
  console.log("product",products)
  const hanldeRating = (value) =>{
    setRating(value)
  }
  const hanldeCategory = (value) =>{
    setCateID(value)
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
                hanldeCategory={hanldeCategory}
                closeSidebar={() => openCloseSidebar(sidebarView)} hanldePrice={hanldePrice} text={text}
                hanldeRating={hanldeRating}
              />
              <ProductList
                limit={limit} totalProduct={totalProduct} hasNextPage={hasNextPage} totalPages={totalPages}
                handlePaging={handlePaging}
                text={text}
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
  const { limit, page, maxPrice, minPrice, location, brands, t, cat ,rating} = ctx.query
  let searchQuery = `limit=${limit || 20}&page=${page || 1}`

  if (location) {
    searchQuery += `&location=${location}`
  }
  if (brands) {
    searchQuery += `&brands=${brands}`
  }
  if (t) {
    searchQuery += `&t=${t}`
  }
  if (cat) {
    searchQuery += `&cat=${cat}`
  }
  if (maxPrice) {
    searchQuery += `&maxPrice=${maxPrice}`
  }
  if (minPrice) {
    searchQuery += `&minPrice=${minPrice}`
  }
  if(rating){
    searchQuery += `&rating=${rating}`
  }

  const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`)
  const data = await res.json()

  return { props: { data: { produtcs: data.data, maxPrice: maxPrice || "", 
  minPrice: minPrice || "", location: location || "", brands: brands || "", 
  t: t || "", cat: cat || "",rating:rating ||"" } } }

}