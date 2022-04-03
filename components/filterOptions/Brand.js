import React, { useState } from "react";
import { Collapse, Input,Label } from "reactstrap";
const Brand = ({hanldeBrand,brands}) => {
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
                  {
                    brands.length > 0
                    ?
                    brands.map((value, i) =>{
                    return(
                      <div key={i} className="custom-control custom-checkbox collection-filter-checkbox" >
                    <Input
                      type="checkbox"
                      className="custom-control-input"
                      value={value.brand._id}
                      id={`brand${i}`}
                      onChange={hanldeBrand}
                    />
                    <Label className="custom-control-label" htmlFor={`brand${i}`}>
                        {value.brand.name} ({value.total})
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

export default Brand;
