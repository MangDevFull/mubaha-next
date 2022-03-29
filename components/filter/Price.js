import React, { useState, useContext, useEffect } from "react";
import InputRange from "react-input-range";
import { useRouter } from "next/router";
import { Input, FormGroup, Label, Row } from "reactstrap";
import NumberFormat from "react-number-format";
import styles from '@/components/filter/filter.module.css'
const Price = () => {
  const router = useRouter();
  const [value, setValue] = useState({ min: 0, max: 10000000 });

  return (
    <>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title">Giá</h3>
        <div className="collection-collapse-block-content">
          <div className="wrapper mt-3">
            <div className="range-slider">
              <InputRange
                minValue={0}
                maxValue={10000000}
                step={500000}
                value={value}
                formatLabel={(value) => (
                  <NumberFormat
                    value={value}
                    thousandSeparator={true}
                    displayType="text"
                    suffix="₫"
                    decimalScale={0}
                  />
                )}
                onChangeComplete={(value) => {
                  // handleCallApi(limit, 1, orderBy, value);
                  console.log(value)
                }}
                onChange={(value) => {
                  setValue(value);
                }}
              />
            </div>
            {/* <div className="mt-4 ml-2">
              <Row>
                <FormGroup>
                  <Label for="exampleEmail">
                    Chọn khoảng giá
                  </Label>
                  <div className="d-flex">
                    <Input
                      className={styles.inputPrice}
                      name="minPrice"
                      step={1000}
                      type="number"
                    />
                    <div className="ml-1 mr-1">
                      <strong> - </strong>
                    </div>
                    <Input
                      className={styles.inputPrice}
                      name="maxPrice"
                      step={1000}
                      type="number"
                    />
                  </div>
                </FormGroup>
              </Row>
            </div> */}
          </div>
        </div>

      </div>

    </>


  );
};

export default Price;
