import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputRange from "react-input-range";
import { useRouter } from "next/router";


const Price = () => {
  const [value, setValue] = useState([0, 500]);
  // Changing State when volume increases/decreases
  // const rangeSelector = (event, newValue) => {
  //   setValue(newValue);
  //   console.log(newValue);
  // };
  return (
    <>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title">Giá</h3>
        <div className="collection-collapse-block-content">
          <div className="wrapper mt-3">
          <div className="range-slider">
            {/* <Typography id="range-slider" gutterBottom>
              Select Price Range:
            </Typography>
            <Slider value={value} onChange={rangeSelector} valueLabelDisplay="auto" />
             Price is between {value[0]} /- and {value[1]} /- */}
             <InputRange
             maxValue={500}
             minValue={0}
             value={value}
             onChange={value => setValue({value})}
             />
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Price;
