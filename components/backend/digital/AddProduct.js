import { useRef, useState, useEffect } from "react";
import Breadcrumb from "../common/BreadCrumb";
import CKEditors from "react-ckeditor-component";
import MyDropzone from "../common/Dropzone";
import Pickcolor from "../common/Pickcolor";
import {StockStatus,StockCountry} from "../../../enums/product.enum.js"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  input,
  Label,
  Row,
} from "reactstrap";
import currencyEnum from "../../../enums/currency.enum.js";
import Select from 'react-select/creatable';

const Digital_add_pro = ({ onBlur, onChange, afterPaste }) => {

  const [content] = useState("content");
  const [categoryFirst,setCategoryFirst] = useState([])
  const [categorySecond,setCategorySecond] = useState([])
  const [categoryThird,setCategoryThird] = useState([])
  const [isDisableSecond,setIsDisableSecond] = useState(true)
  const [isDisableThird,setIsDisableThird] = useState(true)
  const [status,setStatus] = useState([])
  const [countries,setCountries] = useState([])
  const [currencies,setCurrencies] = useState([])


    const inputName = useRef()
    const inputSKU = useRef()
    const inputPrice = useRef()
    const inputDiscount= useRef()

    const aquaticCreatures = [
      { label: 'Shark', value: 'Shark' },
      { label: 'Dolphin', value: 'Dolphin' },
      { label: 'Whale', value: 'Whale' },
      { label: 'Octopus', value: 'Octopus' },
      { label: 'Crab', value: 'Crab' },
      { label: 'Lobster', value: 'Lobster' },
    ];

    

  useEffect(async () => {

    const response = await fetch(`${process.env.API_URL}/categories/first`)

    const data = await response.json()

    setCategoryFirst(data.data)

    setStatus(Object.keys(StockStatus).map((key) => [StockStatus[key]]))

    setCountries(Object.keys(StockCountry).map((key) => [StockCountry[key]]))

    setCurrencies(Object.keys(currencyEnum).map((key) => [currencyEnum[key]]))

  },[])

  const handleCategoryFirst = async (e) =>{
      const id = e.target.value
      const response = await fetch(`${process.env.API_URL}/categories/${id}`)

      const data = await response.json()

      setCategorySecond(data.data)
      setCategoryThird([])
      setIsDisableSecond(false)
      
  }

  const handleCategorySecond = async (e) =>{
    const id = e.target.value
    const response = await fetch(`${process.env.API_URL}/categories/${id}`)

    const data = await response.json()

    setCategoryThird(data.data)
    setIsDisableThird(false)
  }

  const handeSubmit = async () =>{
    const body = {
      name: inputName.current.value,
      price: inputPrice.current.value,
      discount: inputDiscount.current.value,
      sku: inputSKU.current.value,
    }
    console.log(body)

  }

  return (
    <>
      <Breadcrumb title="Thêm sản phẩm" />
      <Container fluid={true}>
        <form>
          <Row className="product-adding">
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h5>Thông tin cơ bản</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup>
                      <Label className="col-form-label pt-0">
                        <span>*</span> Tên sản phẩm
                      </Label>
                      <input
                        className="form-control"
                        type="text"
                        ref={inputName}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0">
                        <span>*</span> SKU
                      </Label>
                      <input
                        className="form-control"
                        type="text"
                        ref={inputSKU}
                      />
                    </FormGroup>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5>Thông tin chi tiết</h5>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`firstLevelCat`}
                      onChange={handleCategoryFirst}
                    >
                      <option value="">--Lưạ chọn--</option>
                      {
                        categoryFirst.map((x)=>{
                          return (
                            <option key={x._id} value={x._id}>
                            {x.name}
                          </option>
                          )
                        })
                      }
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục
                    </Label>
                    <select
                      disabled={isDisableSecond}
                      className="custom-select"
                      required=""
                      name={`firstLevelCat`}
                      onChange={handleCategorySecond}
                    >
                      <option value="">--Select--</option>
                      {
                        categorySecond.map((x)=>{
                          return (
                            <option key={x._id} value={x._id}>
                            {x.name}
                          </option>
                          )
                        })
                      }
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`firstLevelCat`}
                      disabled={isDisableThird}
                    >
                      <option value="">--Select--</option>
                      {
                        categoryThird.map((x)=>{
                          return (
                            <option key={x._id} value={x._id}>
                            {x.name}
                          </option>
                          )
                        })
                      }
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Giá
                    </Label>
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      ref={inputPrice}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Giảm giá
                    </Label>
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      max="100"
                      ref={inputDiscount}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Số lượng
                    </Label>
                    <input
                      className="form-control"
                      type="number"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Trạng thái
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`stockStatus`}
                    >
                      <option value="">--Lựa chọn--</option>
                      {
                        status.map((status,id) =>{
                          return(
                            <option value={status} key={id}>{status}</option>
                          )
                        })
                      }
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Đơn vị tiền
                    </Label>
                    <select
                      className="custom-select"
                      required=""
                      name={`currencyUnit`}
                    >
                      <option value="">--Lựa chọn--</option>
                      {
                        currencies.map((curr, i) =>{
                          return(
                            <option value={curr} key={i}>{curr}</option>
                          )
                        })
                      }
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Thương hiệu
                    </Label>
                    <Select
        options={aquaticCreatures}
        onChange={(opt, meta) => console.log(opt, meta)}
      />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Vị trí kho hàng
                    </Label>
                    <select
                      className="custom-select"
             
                    >
                      <option value="">--Lựa chọn--</option>
                      {
                        countries.map((country,id) =>{
                          return(
                            <option value={country} key={id}>{country}</option>
                          )
                        })
                      }
                    </select>
                  </FormGroup>
                  <Label className="col-form-label pt-0"> Ảnh sản phẩm</Label>
                  <MyDropzone />
                </CardBody>
              </Card>
            </Col>
            <Col xl="6">
              <Card>
                <CardHeader>
                  <h5>Mô tả</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup className=" mb-0">
                      <div className="description-sm">
                        <CKEditors
                          activeclassName="p10"
                          content={content}
                          events={{
                            blur: onBlur,
                            afterPaste: afterPaste,
                            change: onChange,
                          }}
                        />
                      </div>
                    </FormGroup>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5>Thông tin bán hàng</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup>
                      <div className="">
                        <Label className="col-form-label pt-0">Màu sắc</Label>
                        <div className="variants">
                            <Pickcolor
                              // onChangeColor={handleVariantChange}
                            />
                          <div
                            className="btn btn-block mt-4 btn-primary"
                            // onClick={handleAddVariant}
                          >
                            Thêm màu sắc
                          </div>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0"> Size</Label>
                        <input
                          className="form-control"
                          type="text"
                          required=""
                          name={`attributeKey`}
                          placeholder="S, M, L, Xl"
                          type="hidden"
                          value="Size"
                        />

                        <input
                          className="form-control mb-2"
                          type="text"
                          required=""
                          name={`attributeValue`}
                          placeholder="S, M, L, Xl"
                          // onChange={(e) => handleAttributeChange(e, i)}
                        />
                      <div
                        className="btn btn-block mt-4 btn-primary"
                        // onClick={handleAddAttribute}
                      >
                        Thêm Size
                      </div>
                    </FormGroup>
                    {/* <TableCustom
                      columns={columns}
                      data={variantList}
                    ></TableCustom> */}
                  </div>
                </CardBody>
              </Card>
              <FormGroup className="m-10">
                <div className="product-buttons text-center">
                  <Button type="button" color="primary" 
                  onClick={handeSubmit}
                  >
                    Thêm sản phẩm
                  </Button>
                  <Button type="button" color="light">
                    Hủy
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </Container>
      <style></style>
      </>
  );
};

export default Digital_add_pro;
