import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";


const Brand = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);


  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        Thương hiệu
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
  
                  <div
                    className="custom-control custom-checkbox collection-filter-checkbox"

                  >
                    <Input
                     
                      type="checkbox"
                      className="custom-control-input"
      
                    />
                    <label className="custom-control-label">
    
                    </label>
                  </div>

          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;
