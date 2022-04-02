import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Col, Media, Modal, ModalBody } from "reactstrap";
import MasterProductDetail from "@/components/common/product-box/MasterProductDetail";

const ProductItem = ({ product, des, productDetail, title }) => {
  // eslint-disable-next-line

  const uniqueTags = [];

  return (
    <div className="product-box product-wrap">
      {productDetail || product ? (
        <>
          <MasterProductDetail
            product={product}
            productDetail={productDetail}
            uniqueTags={uniqueTags}
            title={title}
            des={des}
          />
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default ProductItem;
