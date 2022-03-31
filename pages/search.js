import Layout from '@/components/Layout.js'
import { Media, Container, Row, Col } from "reactstrap";
import React, { useState, useLayoutEffect,useEffect } from "react";
import FilterPage from "@/components/filter/Filter.js"
import ProductList from "@/components/filter/ProductList.js"
import _ from 'lodash'
import sortByType from "@/enums/sortByType.enum.js";
import orderType from "@/enums/sortOrderType.enum.js"
import 'react-loading-skeleton/dist/skeleton.css'
import useSWR, { SWRConfig } from "swr";
import useSWRInfinite from 'swr/infinite'
import fetcher from '../libs/fetcher'
const API = `${process.env.API_PRODUCT_URL}/search?`
export default function FilterLayoutComponent({ fallback }) {
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  const [limit, setLimit] = useState(20)
  const [cuurentPage, setCurrentPage] = useState(1)
  const [text, setText] = useState(fallback.t)
  const [brand, setBrand] = useState(fallback.brands)
  const [cat, setCateID] = useState(fallback.cat)
  const [priceMin, setPriceMin] = useState(fallback.minPrice)
  const [priceMax, setPriceMax] = useState(fallback.maxPrice)
  const [location, setLocation] = useState(fallback.location)
  const [rating,setRating] = useState(fallback.rating)
  const [order,setOrder] = useState(fallback.order)
  const [sortBy,setSortBy] = useState(fallback.sortBy)
  const [products,setProducts] = useState([])
  const { data, error } = useSWR(`${API}limit=${limit}&page=${cuurentPage}&minPrice=${priceMin}&maxPrice=${priceMax}&location=${location}&brands=${brand}&t=${text}&cat=${cat}&rating=${rating}&order=${order}&sortBy=${sortBy}`,fetcher);
  const handleLimit = (limit) => {
    setLimit(limit)
  }
 console.log(`${API}limit=${limit}&page=${cuurentPage}&minPrice=${priceMin}&maxPrice=${priceMax}&location=${location}&brands=${brand}&t=${text}&cat=${cat}&rating=${rating}&order=${order}&sortBy=${sortBy}`)
  useEffect(() => {
    if(data && data.status ===200){
      setProducts(...products,data.data.docs)
    }
  },data)
  // useLayoutEffect(() => {
  //   handleApi()
  // }, [limit,brand,location,rating,cat,text,priceMin,priceMax,order,sortBy])
  // const hanldeBrand = (e) => {
  //   const isCheck = e.target.checked
  //   const value = e.target.value
  //   if(isCheck) {
  //     if(brand === ""){
  //         setBrand(value)
  //     }else{
  //       const prev = `${brand},${value}`
  //       setBrand(prev)
  //     }
  //   }else{
  //     const list =  _.split(brand,',')
  //     const rs = _.pull(list,value)
  //     setBrand(rs.toString())
  //   }
  // }
  // const handleLocation = (e) => {
  //   const isCheck = e.target.checked
  //   const value = e.target.value
  //   if(isCheck) {
  //     if(location === ""){
  //         setLocation(value)
  //     }else{
  //       const prev = `${location},${value}`
  //       setLocation(prev)
  //     }
  //   }else{
  //     const list =  _.split(location,',')
  //     const rs = _.pull(list,value)
  //     setLocation(rs.toString())
  //   }
  // }
  // const hanldePrice = (min,max) =>{
  //     setPriceMax(max)
  //     setPriceMin(min)
  // }
  const handlePaging = async () => {
    const page = cuurentPage + 1
      setTimeout(() => {
        setCurrentPage(page)
      },1000)
  }
  console.log(data)

  // const handleApi = async () => {
  //   try {
  //     let searchQuery = `limit=${limit}&page=${cuurentPage}`
  //     if (location !== "") {
  //       searchQuery += `&location=${location}`
  //     }
  //     if (brand !== "") {
  //       searchQuery += `&brands=${brand}`
  //     }
  //     if (text !== "") {
  //       searchQuery += `&t=${text}`
  //     }
  //     if (cat !== "") {
  //       searchQuery += `&cat=${cat}`
  //     }
  //     if (priceMax !== "") {
  //       searchQuery += `&maxPrice=${priceMax}`
  //     }
  //     if (priceMin !== "") {
  //       searchQuery += `&minPrice=${priceMin}`
  //     }
  //     if(rating >0){
  //       searchQuery += `&rating=${rating}`
  //     }
  //     if(order){
  //       searchQuery += `&order=${order}`
  //     }
  //     if(sortBy){
  //       searchQuery += `&sortBy=${sortBy}`
  //     }
  //     console.log(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`)
  //     const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`)
  //     const data = await res.json()
  //     if (data.status === 200) {
  //         setProduct([...data.data.docs])
  //         setCurrentPage(data.data.page)
  //         setTotalPages(data.data.totalPages)
  //         setTotalProduct(data.data.totalDocs)
  //         setHasNextPage(data.data.hasNextPage)
  //     }
  //   } catch (error) {
  //     console.log("error", error)
  //   }
  // }
  // const hanldeRating = (value) =>{
  //   setRating(value)
  // }
  // const hanldeCategory = (value) =>{
  //   setCateID(value)
  // }
  // const hanldeOrder = (e) =>{
  //   switch(e.target.options.selectedIndex){
  //     case 0:{
  //       setOrder("")
  //       setSortBy("")
  //       break;
  //     }
  //     case 1:{
  //       setOrder(orderType.DESC)
  //       setSortBy(sortByType.PRICE)
  //       break;
  //     }
  //     case 2:{
  //       setOrder(orderType.ASC)
  //       setSortBy(sortByType.PRICE)
  //       break;
  //     }
  //     case 3:{
  //       setOrder(orderType.DESC)
  //       setSortBy(sortByType.TIME)
  //       break;
  //     }
  //   }
  // }
  
  return (
    <SWRConfig value={{ fallback }}>
    {data ?
    <div style={{ backgroundColor: "rgb(245, 245, 250);" }}>
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              {/* <FilterPage
                sm="3"
                sidebarView={sidebarView} hanldeBrand={hanldeBrand} handleLocation={handleLocation}
                hanldeCategory={hanldeCategory}
                closeSidebar={() => openCloseSidebar(sidebarView)} hanldePrice={hanldePrice} text={text}
                hanldeRating={hanldeRating}
              /> */}
              <ProductList
                limit={limit} totalProduct={data.data.totalDocs} hasNextPage={data.data.hasNextPage} totalPages={data.data.totalPages}
                handlePaging={handlePaging}
                // text={text} hanldeOrder={hanldeOrder}
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
    :
    "aaa"
  }
    </SWRConfig>
  )
}
FilterLayoutComponent.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps(ctx) {
  const { limit, page, maxPrice, minPrice, location, brands, t, cat ,rating,order,sortBy} = ctx.query
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
  if(order){
    searchQuery += `&order=${order}`
  }
  if(sortBy){
    searchQuery += `&sortBy=${sortBy}`
  }
  const APIfinal = `${API}${searchQuery}`
  const repoInfo = await fetcher(APIfinal);

  return {
    props: {
      fallback: {
        [APIfinal]: repoInfo,
        maxPrice: maxPrice || "", 
  minPrice: minPrice || "", location: location || "", brands: brands || "", 
  t: t || "", cat: cat || "",rating:rating ||"" ,sortBy:sortBy || "",order:order || ""
      }
    }
  };

}