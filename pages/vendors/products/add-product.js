
import LayoutBackEnd from "@/components/backend/Layout";
// import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";

import { useRef, useState, useEffect } from "react";
import Breadcrumb from "@/components/backend/common/BreadCrumb";

import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/backend/Editor"), {
  ssr: false
})

import MyDropzone from "@/components/backend/common/Dropzone";
import Pickcolor from "@/components/backend/common/Pickcolor";
import { StockStatus, StockCountry } from "../../../enums/product.enum.js"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import currencyEnum from "../../../enums/currency.enum.js";
import SelectAdd from 'react-select/creatable';
import Select from 'react-select'

export default function AddProductPage() {
  const [variantList, setVariantList] = useState([
    {
      variantName: "",
    },
  ]);

  const [sizeList, setSizeList] = useState([
    {
      sizes: [
        {
          name: "",
          sku: "",
          price: "",
          discount: "",
          stock: {
            quantity: "",
            status: "",
          },
        },
      ],
    },
  ]);

  const handleAddSize = async (e) => {
    setSizeList([
      ...sizeList,
      {
        sizes: [
          {
            sku: "",
            price: "",
            discount: "",
            stock: {
              quantity: "",
              status: "",
            },
          },
        ],
      },
    ]);
  };

  const handleAddVariant = async (e) => {
    setVariantList([...variantList, { variantName: "" }]);
  };

  const handleVariantChange = (color, index) => {
    const list = [...variantList];
    list[index]["variantName"] = color.hex;
    setVariantList(list);
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...sizeList];
    list[index]["sizes"][0][name] = value
    setSizeList(list)

  };
  // console.log("variantList", variantList)
  // console.log("sizeList", sizeList)

  //end Variant
  const [content] = useState("");
  const [categoryFirst, setCategoryFirst] = useState([])
  const [categorySecond, setCategorySecond] = useState([])
  const [categoryThird, setCategoryThird] = useState([])
  const [isDisableSecond, setIsDisableSecond] = useState(true)
  const [isDisableThird, setIsDisableThird] = useState(true)
  const [status, setStatus] = useState([])
  const [countries, setCountries] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [brands, setBrands] = useState([])
  const [placeholderCategory, setPlaceholderCategory] = useState('')

  const [selectBrand, setSelectBrand] = useState('')
  const [selectStatus, setSelectStatus] = useState('')
  const [slectCurrency, setSelectCurrency] = useState('')
  const [selectCountry, setSelectCountry] = useState('')
  const [selectFirstCategory, setSelectFirstCategory] = useState('')
  const [selectSecondCategory, setSelectSecondCategory] = useState('')
  const [selectThirdCategory, setSelectThirdCategory] = useState('')
  const [images,setImage] = useState([])


  const inputName = useRef()
  const inputSKU = useRef()
  const inputPrice = useRef()
  const inputDiscount = useRef()

  const getImages = (e) => {
    setImage(e)
  }

  useEffect(async () => {

    const response = await fetch(`${process.env.API_URL}/categories/first`)

    const data = await response.json()

    const categories = data.data.map((category) => {
      return { label: category.name, value: category._id }
    })
    if (data.status === 200) {
      setCategoryFirst(categories)
    }
    const stockStatuses = Object.keys(StockStatus).map((key) => {
      return { label: key, value: key }
    })

    setStatus(stockStatuses)

    const stockCountries = Object.keys(StockCountry).map((key) => {
      return { label: key, value: key }
    })

    setCountries(stockCountries)

    const currencies = Object.keys(currencyEnum).map((key) => {
      const data = currencyEnum[key]
      return { label: key, value: data }
    })

    setCurrencies(currencies)

    const brands = await fetch(`${process.env.API_URL}/brands`)

    const brandDatas = await brands.json()
 
    const brandOptions = brandDatas.data.map((key) => {
      return { label: key.name, value: key._id }
    })

    setBrands(brandOptions)

  }, [])

  const handleCategoryFirst = async (e) => {
    const id = e.value
    setSelectFirstCategory(id)
    const response = await fetch(`${process.env.API_URL}/categories/${id}`)

    const data = await response.json()

    const categoriesSecond = data.data.map((category) => {
      return { label: category.name, value: category._id }
    })
    if (data.status == 200) {
      setCategorySecond(categoriesSecond)
      setCategoryThird([])
      setIsDisableSecond(false)
    }
  }

  const handleCategorySecond = async (e) => {
    const id = e.value
    setSelectSecondCategory(id)
    const response = await fetch(`${process.env.API_URL}/categories/${id}`)

    const data = await response.json()
    const categoriesThird = data.data.map((category) => {
      return { label: category.name, value: category._id }
    })
    if (data.status == 200) {
      if (categoriesThird.length > 0) {
        setCategoryThird(categoriesThird)
        setIsDisableThird(false)
        setPlaceholderCategory("Lựa chọn")
      } else {
        setIsDisableThird(true)
        setPlaceholderCategory("Danh mục chưa có")
      }
    }
  }

  const handleCreateBrand = async (e) => {
    if (e.__isNew__) {
      const body = {
        name: e.value
      }
      const response = await fetch(`${process.env.API_URL}/create-brand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (data.status == 400) {
        alert(data.message)
      }else if (data.status == 200){
        const brandOptions = data.data.map((key) => {
          return { label: key.name, value: key._id }
        })
        setBrands(brandOptions)
      }
    } else {
      setSelectBrand(e.value)
    }
  }

  const handeSubmit = async () => {
    images.forEach(async (value)=>{
     const url = value.uploadUrl
    console.log(url)
     console.log(encodeURI(url))
     console.log(URI(url))

      // const response = await fetch(value.uploadUrl,{
      //   method: 'PUT',
      //   headers: {'Content-Type': 'multipart/form-data','Access-Control-Allow-Origin': '*'},

      //   body: JSON.stringify(value.formData)
      // })
      // const data = await response.json()
      // console.log(data)
    })
    const body = {
      name: inputName.current.value,
      price: inputPrice.current.value,
      discount: inputDiscount.current.value,
      sku: inputSKU.current.value,
      stockCountry: selectCountry,
      stockStatus: selectStatus,
      brand: selectBrand,
      currencyUnit: slectCurrency,
      firstLevelCat: selectFirstCategory,
      secondLevelCat: selectSecondCategory,
      threeLevelCat: selectThirdCategory,
    }
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
                      <span>*</span> Danh mục 1
                    </Label>
                    <Select
                      onChange={handleCategoryFirst}
                      options={categoryFirst}
                      placeholder={"Lựa chọn"}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục 2
                    </Label>
                    <Select
                      isDisabled={isDisableSecond}
                      onChange={handleCategorySecond}
                      options={categorySecond}
                      placeholder={"Lựa chọn"}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Danh mục 3
                    </Label>
                    <Select
                      isDisabled={isDisableThird}
                      options={categoryThird}
                      placeholder={placeholderCategory}
                      onChange={(e) => {
                        setSelectThirdCategory(e.value)
                      }}
                    />
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
                    <Select
                      options={status}
                      placeholder="Lựa chọn"
                      onChange={(e) => {
                        setSelectStatus(e.value)
                      }}
                    />

                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Đơn vị tiền
                    </Label>
                    <Select
                      options={currencies}
                      placeholder="Lựa chọn"
                      onChange={(e) => {
                        setSelectCurrency(e.value)
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Thương hiệu
                    </Label>
                    <SelectAdd
                      options={brands}
                      onChange={handleCreateBrand}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Vị trí kho hàng
                    </Label>
                    <Select
                      options={countries}
                      placeholder="Lựa chọn"
                      onChange={(e) => {
                        setSelectCountry(e.value)
                      }}
                    />
                  </FormGroup>
                  <Label className="col-form-label pt-0"> Ảnh sản phẩm</Label>
                  <MyDropzone sendImages={getImages} />
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
                      <Editor />
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
                        {variantList.map((x, i) => {
                          return (
                            <div key={i} className="variants">
                              <Pickcolor
                                index={i}
                                onChangeColor={handleVariantChange}
                              />
                            </div>
                          );
                        })}
                        <div
                          className="btn btn-block mt-4 btn-primary"
                          onClick={handleAddVariant}
                        >
                          Thêm màu sắc
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0"> Size</Label>
                      {sizeList.map((x, i) => {
                        return (
                          <>
                            <Input
                              className="form-control mb-2"
                              type="text"
                              required=""
                              name={`name`}
                              placeholder="S, M, L, Xl"
                              onChange={(e) => handleSizeChange(e, i)}
                            />
                          </>
                        )
                      })}
                      <div className="btn btn-block mt-4 btn-primary" onClick={handleAddSize}>
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
    </>
  )
}

AddProductPage.getLayout = function getLayout(page) {
  return <LayoutBackEnd>{page}</LayoutBackEnd>;
};