import React, { useState } from "react";
import { Collapse, Input } from "reactstrap";


const Brand = ({hanldeBrand}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleBrand = () => setIsOpen(!isOpen);


  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        Thương hiệu
      </h3>
      <Collapse isOpen={isOpen}>
      <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
  
                  <div className="custom-control custom-checkbox collection-filter-checkbox" >
                    <Input
                      type="checkbox"
                      className="custom-control-input"
                      id="A"
      
                    />
                    <label className="custom-control-label" htmlFor={`A`}>
    
                    </label>
                  </div>

          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;
