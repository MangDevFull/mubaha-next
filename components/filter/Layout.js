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
  {children}
      <Footer />
    </>
  );
}