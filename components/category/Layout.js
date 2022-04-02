import Footer from '@/components/Footer.js'
import HeaderTwo from '../HeaderTwo.js';
import React, { useState } from "react";
export default function FilterLayoutComponent({ children }) {
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