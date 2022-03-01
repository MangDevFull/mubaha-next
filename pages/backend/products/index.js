import Link from "next/link";
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Digital_pro_list from './../../../components/digital/digital-pro-list.js'

const IndexProduct = ({dataIndexProduct}) => (
<>
<Digital_pro_list dataIndexProduct={dataIndexProduct}/>

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