import React, { useState, useContext } from "react";
import { Collapse, Input,Label } from "reactstrap";
import { StockCountry } from '@/enums/product.enum.js'
import locationEnum from "@/enums/location.enum";
const Location = ({handleLocation,stockCountries}) => {
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
              stockCountries.length > 0 ?
              stockCountries.map((value, index) => {
                return (
                <div key={index} className="custom-control custom-checkbox collection-filter-checkbox">
                  <Input type="checkbox" value={value.country} 
                  onChange={handleLocation}
                  className="custom-control-input" id={`location${index}`} />
                <Label className="custom-control-label" htmlFor={`location${index}`}>
                  {locationEnum[value.country]} ({value.total})
                </Label>
                  </div>

                )
              })
              :
              "Không tìm thấy các sự lựa chọn nào"
              }

          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Location;
