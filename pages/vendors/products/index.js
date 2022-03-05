import Link from "next/link";
import React from 'react';
import DigitalProList from '@/components/backend/digital/DigitalProList'
import LayoutBackEnd from "@/components/backend/Layout";

const IndexProduct = ({dataIndexProduct}) => (
<>
  <LayoutBackEnd>
    <DigitalProList dataIndexProduct={dataIndexProduct}/>
  </LayoutBackEnd>
</>
)

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.API_URL}/web/vendor/products/listing`)

  const data = await res.json()
  return {
    props: {
      dataIndexProduct: data.data.docs
    }, // will be passed to the page component as props
  }
}

export default IndexProduct