import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import { useRouter } from "next/router";

const Price = () => {
  return (
    <>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title">Giá</h3>
        <div className="collection-collapse-block-content">
          <div className="wrapper mt-3">
            <div className="range-slider">
              <InputRange
                maxValue={500}
                minValue={0}
                // value={price}
                // onChange={(price) => {
                //   setSelectedPrice(price),
                //     router.push(
                //       `${url}?category=${context.state}&brand=${context.selectedBrands}&color=${context.selectedColor}&size=${context.selectedSize}&minPrice=${context.selectedPrice.min}&maxPrice=${context.selectedPrice.max}`
                //     );
                // }}
                // onChangeComplete={(price) => {
                //   context.setSelectedPrice(price),
                //     router.push(
                //       `${url}?category=${context.state}&brand=${context.selectedBrands}&color=${context.selectedColor}&size=${context.selectedSize}&minPrice=${context.selectedPrice.min}&maxPrice=${context.selectedPrice.max}`
                //     );
                // }}
                type="text"
                className="js-range-slider"
                // defaultValue
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Price;
