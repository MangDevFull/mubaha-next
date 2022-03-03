import Link from "next/link";
import React from 'react';
import DigitalProList from '@/components/backend/digital/DigitalProList'

const IndexProduct = ({dataIndexProduct}) => (
<>
<DigitalProList dataIndexProduct={dataIndexProduct}/>

</>
)

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3001/api/v1/products/listing')
  const data = await res.json()
  return {
    props: {
      dataIndexProduct: data.data.products.docs
    }, // will be passed to the page component as props
  }
}

export default IndexProduct