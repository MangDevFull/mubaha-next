import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import NumberFormat from "react-number-format";
const Price = () => {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [isInvalidPrice, setIsInvalidPrice] = useState(false)
  const hanldeMinPrice = (e) => {
    setMin(parseInt(e.value))
  }
  const hanldeMaxPrice = (e) => {
    setMax(parseInt(e.value))
  }
  const handlePrice = () => {
    if (min >= max) {
      const prevMin = min
      const prevMax = max
      setMin(prevMax)
      setMax(prevMin)
    } 
  }

  return (
    <>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title">Khoảng Giá</h3>
        <div className="collection-collapse-block-content">
          <div className="wrapper mt-3" >
            <div className="range-slider d-flex" >
              <NumberFormat
                thousandSeparator="."
                placeholder="Từ"
                decimalSeparator=","
                className="w-100 h-100"
                onValueChange={(e) => hanldeMinPrice(e)}
              />
              <div className="ml-2 mr-2"><strong> - </strong></div>
              <NumberFormat
                placeholder="Đến"
                onValueChange={(e) => hanldeMaxPrice(e)}
                thousandSeparator="."
                decimalSeparator=","
                className="w-100 h-100"
              />

            </div>
            {isInvalidPrice && (
              <div className="d-flex mt-2">
                <span style={{ color: "red" }}>
                  <i className="fa fa-solid fa-exclamation mr-2"></i> Khoảng giá không hợp lệ
                </span>
              </div>
            )}
            <div>
              <div className="d-flex justify-content-center mt-3">
                <Button
                  className="btn btn-solid"
                  style={{ width: "100%" }}
                  onClick={handlePrice}
                >
                  Áp dụng
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>


  );
};

export default Price;
