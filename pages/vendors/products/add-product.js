import React from 'react';
import CreateProduct from '@/components/backend/digital/AddProduct.js'
import LayoutBackEnd from "@/components/backend/Layout";


const AddProduct = () => (
<>
<CreateProduct />
</>
)

AddProduct.getLayout = function getLayout(page) {
    return <LayoutBackEnd>{page}</LayoutBackEnd>;
  };

export default AddProduct