import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";

const Category = ({categories,hanldeCategory}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Danh mục
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
              {categories.length >0
              ?
              categories.map(category =>{
                  return(
                    <>
                    <li onClick={() => hanldeCategory(category.category._id)}>
                  <lable className="custom-control-label" >
                    {category.category.name} ({category.total})
                  </lable>
                </li>
                    </>
                  )
              })
              :
              "Không tìm thấy các sự lựa chọn nào"
              }
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
