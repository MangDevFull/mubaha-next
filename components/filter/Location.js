import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import { StockCountry } from '@/enums/product.enum.js'
import locationEnum from "@/enums/location.enum";
const Brand = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleBrand = () => setIsOpen(!isOpen);


  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        NƠI BÁN
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand">
          {
                   Object.keys(StockCountry).map((value, index)=>{
                     console.log("value",value)
                  return(
              <>
            <div className="custom-control custom-checkbox collection-filter-checkbox" >
  
                <Input
                  value={StockCountry[value]}
                  type="checkbox"
                  className="custom-control-input"

                />
                <label className="custom-control-label">
                    {locationEnum[value]}
                </label>
                </div>
              </>
              
              ) })}

          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;
