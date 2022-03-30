import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import { StockCountry } from '@/enums/product.enum.js'
import locationEnum from "@/enums/location.enum";
const Location = ({handleLocation}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleLocation = () => setIsOpen(!isOpen);


  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleLocation}>
        NƠI BÁN
      </h3>
      <Collapse isOpen={isOpen}>
      <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
            {
              Object.keys(StockCountry).map((value, index) => {
                return (
                <div className="custom-control custom-checkbox collection-filter-checkbox">
                  <Input type="checkbox" value={StockCountry[value]} 
                  onChange={handleLocation}
                  className="custom-control-input" id={`location${index}`} />
                <label className="custom-control-label" htmlFor={`location${index}`}>
                  {locationEnum[value]}
                </label>
                  </div>

                )
              })}

          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Location;
